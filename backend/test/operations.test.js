import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fixture, password } from './helpers.js';
import { administer, migrate } from '../src/operations.js';
import { verifyPassword } from '../src/security.js';

test('migration is idempotent and provisioning validates roles and audits assignment/revocation', async t => {
  const f = await fixture(); t.after(() => f.close());
  await migrate(f.engine);
  assert.equal((await f.engine.query('SELECT * FROM schema_migrations')).rows.length, 1);
  const input = { name: 'Profissional fictício', email: 'professional@example.test', password };
  const professional = await administer(f.engine, f.vault, 'create-professional', input);
  const row = (await f.engine.query('SELECT * FROM users WHERE id=$1', [professional.id])).rows[0];
  assert.equal(row.role, 'professional'); assert.ok(await verifyPassword(password, row.password_hash));
  assert.ok(!row.profile_ciphertext.includes(input.email));
  await assert.rejects(administer(f.engine, f.vault, 'create-professional', input));
  const patient = await f.createUser();
  const assignment = { professionalId: professional.id, patientId: patient.id };
  await administer(f.engine, f.vault, 'assign', assignment);
  await administer(f.engine, f.vault, 'assign', assignment);
  assert.equal((await f.engine.query('SELECT * FROM care_assignments')).rows.length, 1);
  await administer(f.engine, f.vault, 'revoke', assignment);
  assert.equal((await f.engine.query('SELECT * FROM care_assignments')).rows.length, 0);
  await assert.rejects(administer(f.engine, f.vault, 'assign', { professionalId: patient.id, patientId: professional.id }));
  await assert.rejects(administer(f.engine, f.vault, 'assign', { ...assignment, admin: true }));
  await assert.rejects(administer(f.engine, f.vault, 'unknown', {}));
  const events = (await f.engine.query('SELECT action FROM audit_events')).rows;
  assert.ok(events.some(e => e.action === 'operator.assignment.revoke'));
});

test('failed migration rolls back before returning the failure', async () => {
  const queries = [];
  const client = { async query(sql) { queries.push(sql); if (sql.includes('CREATE TABLE')) throw new Error('test failure'); return { rows: [] }; } };
  await assert.rejects(migrate(client), /test failure/);
  assert.equal(queries.at(-1), 'ROLLBACK');
});
