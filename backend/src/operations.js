import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { z } from 'zod';
import { registration } from './schema.js';
import { hashPassword } from './security.js';

export async function migrate(client) {
  await client.query('BEGIN');
  try {
    await client.query('SELECT pg_advisory_xact_lock(902026)');
    await client.query('CREATE TABLE IF NOT EXISTS schema_migrations (version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())');
    const done = await client.query('SELECT 1 FROM schema_migrations WHERE version=$1', ['001_initial']);
    if (!done.rows.length) {
      const sql = await readFile(new URL('../db/001_initial.sql', import.meta.url), 'utf8');
      if (client.exec) await client.exec(sql); else await client.query(sql);
      await client.query('INSERT INTO schema_migrations (version) VALUES ($1)', ['001_initial']);
    }
    await client.query('COMMIT');
  } catch (error) { await client.query('ROLLBACK'); throw error; }
}

export async function administer(client, vault, action, data) {
  await client.query('BEGIN');
  try {
    let result;
    if (action === 'create-professional') {
      const input = registration.parse(data);
      const id = randomUUID();
      await client.query("INSERT INTO users (id,email_index,profile_ciphertext,password_hash,role) VALUES ($1,$2,$3,$4,'professional')", [id, vault.emailIndex(input.email), vault.encrypt({ name: input.name, email: input.email }, `profile:${id}`), await hashPassword(input.password)]);
      result = { id };
    } else if (['assign', 'revoke'].includes(action)) {
      const input = z.strictObject({ professionalId: z.uuid(), patientId: z.uuid() }).parse(data);
      const valid = await client.query("SELECT 1 FROM users p,users u WHERE p.id=$1 AND p.role='professional' AND u.id=$2 AND u.role='patient'", [input.professionalId, input.patientId]);
      if (!valid.rows.length) throw new Error('Invalid assignment');
      if (action === 'assign') await client.query('INSERT INTO care_assignments (professional_id,patient_id) VALUES ($1,$2) ON CONFLICT DO NOTHING', [input.professionalId, input.patientId]);
      else await client.query('DELETE FROM care_assignments WHERE professional_id=$1 AND patient_id=$2', [input.professionalId, input.patientId]);
      await client.query('INSERT INTO audit_events (actor_id,action,resource_id) VALUES ($1,$2,$3)', [input.professionalId, `operator.assignment.${action}`, input.patientId]);
      result = { status: 'complete' };
    } else throw new Error('Unknown operation');
    await client.query('COMMIT');
    return result;
  } catch (error) { await client.query('ROLLBACK'); throw error; }
}
