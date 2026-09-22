import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { fixture, origin, password } from './helpers.js';
import { digest } from '../src/security.js';

test('registration, login, profile, cookies and logout preserve identity privacy', async t => {
  const f = await fixture(); t.after(() => f.close());
  const data = { name: 'Paciente de teste', email: 'patient@example.test', password };
  const created = await f.request(null, 'POST', '/auth/register', data);
  const duplicate = await f.request(null, 'POST', '/auth/register', data);
  assert.equal(created.statusCode, 202); assert.equal(duplicate.statusCode, 202); assert.equal(created.body, duplicate.body);
  const db = (await f.engine.query('SELECT * FROM users')).rows;
  assert.equal(db.length, 1); assert.equal(db[0].role, 'patient');
  assert.ok(!JSON.stringify(db).includes(data.email)); assert.ok(!JSON.stringify(db).includes(password)); assert.ok(!JSON.stringify(db).includes(data.name));
  const badRole = await f.request(null, 'POST', '/auth/register', { ...data, role: 'professional' }); assert.equal(badRole.statusCode, 400);
  const bad = await f.request(null, 'POST', '/auth/login', { email: data.email, password: 'Wrong-password-123' });
  const missing = await f.request(null, 'POST', '/auth/login', { email: 'absent@example.test', password });
  assert.equal(bad.statusCode, 401); assert.equal(bad.body, missing.body);
  const logged = await f.request(null, 'POST', '/auth/login', { email: data.email, password });
  assert.equal(logged.statusCode, 200);
  const header = logged.headers['set-cookie'];
  for (const flag of ['HttpOnly', 'Secure', 'SameSite=Strict', 'Path=/']) assert.ok(header.includes(flag));
  assert.ok(header.startsWith('__Host-ravecare_session='));
  const user = { cookie: header.split(';')[0] };
  const token = user.cookie.split('=')[1];
  const session = (await f.engine.query('SELECT * FROM sessions')).rows[0];
  assert.equal(session.token_hash, digest(token)); assert.ok(!JSON.stringify(session).includes(token));
  const me = await f.request(user, 'GET', '/auth/me');
  assert.equal(me.json().user.email, data.email); assert.equal(me.headers['cache-control'], 'no-store');
  assert.ok(!me.body.includes('password_hash'));
  assert.equal((await f.request(user, 'POST', '/auth/logout')).statusCode, 204);
  assert.equal((await f.request(user, 'GET', '/auth/me')).statusCode, 401);
});

test('anamnesis draft, resume, optimistic concurrency, submit and locking', async t => {
  const f = await fixture(); t.after(() => f.close()); const user = await f.createUser();
  assert.deepEqual((await f.request(user, 'GET', '/anamnesis')).json(), { answers: {}, status: 'not_started', version: 0 });
  const answers = { goals: ['sleep'], successDefinition: 'Dormir melhor', medications: 'Informação fictícia restrita' };
  assert.equal((await f.request(user, 'PUT', '/anamnesis', { version: 0, answers })).statusCode, 200);
  const stored = (await f.engine.query('SELECT answers_ciphertext FROM anamneses')).rows[0];
  assert.ok(!stored.answers_ciphertext.includes(answers.medications));
  assert.deepEqual((await f.request(user, 'GET', '/anamnesis')).json().answers, answers);
  assert.equal((await f.request(user, 'PUT', '/anamnesis', { version: 0, answers })).statusCode, 409);
  const updated = await f.request(user, 'PUT', '/anamnesis', { version: 1, answers: { ...answers, sleepScore: 4 } });
  assert.equal(updated.json().version, 2);
  assert.equal((await f.request(user, 'PUT', '/anamnesis', { version: 1, answers })).statusCode, 409);
  assert.equal((await f.request(user, 'POST', '/anamnesis/submit', { version: 1 })).statusCode, 409);
  assert.deepEqual((await f.request(user, 'POST', '/anamnesis/submit', { version: 2 })).json(), { version: 3, status: 'submitted' });
  assert.equal((await f.request(user, 'POST', '/anamnesis/submit', { version: 3 })).statusCode, 409);
  assert.equal((await f.request(user, 'PUT', '/anamnesis', { version: 3, answers })).statusCode, 409);
  const events = (await f.engine.query('SELECT * FROM audit_events')).rows;
  assert.ok(events.some(e => e.action === 'anamnesis.submit')); assert.ok(!JSON.stringify(events).includes(answers.medications));
});

test('cross-patient access is denied; only an assigned professional can read, revocation is immediate', async t => {
  const f = await fixture(); t.after(() => f.close());
  const patient = await f.createUser(); const stranger = await f.createUser();
  const doctor = await f.createUser('professional'); const otherDoctor = await f.createUser('professional');
  await f.request(patient, 'PUT', '/anamnesis', { version: 0, answers: { goals: ['sleep'] } });
  const url = `/professional/patients/${patient.id}/anamnesis`;
  for (const user of [patient, stranger]) assert.equal((await f.request(user, 'GET', url)).statusCode, 403);
  assert.equal((await f.request(doctor, 'GET', url)).statusCode, 404);
  assert.equal((await f.request(doctor, 'GET', `/professional/patients/${randomUUID()}/anamnesis`)).statusCode, 404);
  await f.engine.query('INSERT INTO care_assignments VALUES ($1,$2)', [doctor.id, patient.id]);
  assert.equal((await f.request(doctor, 'GET', url)).statusCode, 200);
  assert.equal((await f.request(otherDoctor, 'GET', url)).statusCode, 404);
  const list = (await f.request(doctor, 'GET', '/professional/patients')).json().patients;
  assert.equal(list.length, 1); assert.equal(list[0].id, patient.id); assert.ok(!JSON.stringify(list).includes(patient.email));
  assert.equal((await f.request(otherDoctor, 'GET', '/professional/patients')).json().patients.length, 0);
  assert.equal((await f.request(stranger, 'GET', '/professional/patients')).statusCode, 403);
  assert.equal((await f.request(doctor, 'PUT', '/anamnesis', { version: 1, answers: {} })).statusCode, 403);
  assert.equal((await f.request(stranger, 'PUT', '/anamnesis', { version: 0, patientId: patient.id, answers: {} })).statusCode, 400);
  await f.engine.query('DELETE FROM care_assignments WHERE professional_id=$1', [doctor.id]);
  assert.equal((await f.request(doctor, 'GET', url)).statusCode, 404);
  const hidden = await f.store.readAnamnesis(stranger, patient.id); assert.equal(hidden, undefined);
});

test('RLS denies direct cross-patient reads and writes and API role cannot elevate privileges', async t => {
  const f = await fixture(); t.after(() => f.close()); const a = await f.createUser(); const b = await f.createUser();
  await f.request(a, 'PUT', '/anamnesis', { version: 0, answers: { goals: ['sleep'] } });
  const rows = await f.store.tx(b.id, db => db.query('SELECT * FROM anamneses'));
  assert.equal(rows.rows.length, 0);
  const changed = await f.store.tx(b.id, db => db.query("UPDATE anamneses SET status='submitted' WHERE patient_id=$1 RETURNING *", [a.id]));
  assert.equal(changed.rows.length, 0);
  await assert.rejects(f.store.tx(b.id, db => db.query("INSERT INTO anamneses VALUES ($1,'x','draft',1,now())", [randomUUID()])));
  await assert.rejects(f.store.tx(a.id, db => db.query("UPDATE users SET role='professional' WHERE id=$1", [a.id])));
  await assert.rejects(f.store.tx(a.id, db => db.query('INSERT INTO care_assignments VALUES ($1,$2)', [a.id, b.id])));
  await assert.rejects(f.store.tx(a.id, db => db.query("INSERT INTO users VALUES ($1,'x','x','x','professional',now())", [randomUUID()])));
  await assert.rejects(f.store.tx(a.id, db => db.query('DELETE FROM audit_events')));
  assert.equal((await f.store.tx(null, db => db.query('SELECT * FROM anamneses'))).rows.length, 0);
});

test('authentication, CSRF, validation, limits, session expiry and generic errors', async t => {
  const f = await fixture(); t.after(() => f.close()); const user = await f.createUser();
  assert.equal((await f.request(null, 'GET', '/anamnesis')).statusCode, 401);
  assert.equal((await f.request({ cookie: '__Host-ravecare_session=bad' }, 'GET', '/auth/me')).statusCode, 401);
  assert.equal((await f.request(user, 'PUT', '/anamnesis', { version: 0, answers: {} }, { origin: 'https://evil.example' })).statusCode, 403);
  assert.equal((await f.app.inject({ method: 'POST', url: '/auth/logout', headers: { cookie: user.cookie } })).statusCode, 403);
  const opt = await f.request(null, 'OPTIONS', '/anamnesis'); assert.equal(opt.statusCode, 204); assert.equal(opt.headers['access-control-allow-origin'], origin);
  assert.equal((await f.request(null, 'OPTIONS', '/anamnesis', null, { origin: 'https://evil.example' })).statusCode, 403);
  assert.equal((await f.request(user, 'PUT', '/anamnesis', { version: 0, answers: { sleepScore: 12 } })).statusCode, 400);
  assert.equal((await f.request(user, 'PUT', '/anamnesis', { version: 0, answers: { additionalInfo: 'x'.repeat(40000) } })).statusCode, 413);
  await f.request(user, 'PUT', '/anamnesis', { version: 0, answers: {} });
  assert.equal((await f.request(user, 'POST', '/anamnesis/submit', { version: 1 })).statusCode, 400);
  assert.equal((await f.request(user, 'GET', '/anamnesis')).json().status, 'draft');
  await f.engine.query("UPDATE sessions SET expires_at=now()-interval '1 second'");
  assert.equal((await f.request(user, 'GET', '/auth/me')).statusCode, 401);
  f.store.findLogin = async () => { throw new Error('secret-patient-data postgres://secret'); };
  const failed = await f.request(null, 'POST', '/auth/login', { email: user.email, password });
  assert.equal(failed.statusCode, 500); assert.ok(!failed.body.includes('secret'));
  assert.equal((await f.request(null, 'GET', '/health')).json().status, 'ok');
});

test('login rate limit blocks repeated attempts', async t => {
  const f = await fixture({ loginLimit: 2 }); t.after(() => f.close());
  const payload = { email: 'absent@example.test', password };
  assert.equal((await f.request(null, 'POST', '/auth/login', payload)).statusCode, 401);
  assert.equal((await f.request(null, 'POST', '/auth/login', payload)).statusCode, 401);
  assert.equal((await f.request(null, 'POST', '/auth/login', payload)).statusCode, 429);
});
