import { PGlite } from '@electric-sql/pglite';
import pg from 'pg';
import { randomUUID, randomBytes } from 'node:crypto';
import { createVault, hashPassword } from '../src/security.js';
import { Store } from '../src/store.js';
import { buildApp } from '../src/app.js';
import { migrate } from '../src/operations.js';

export const origin = 'https://app.ravecare.test';
export const password = 'Somente-testes!2026';
export async function fixture(options = {}) {
  let engine;
  if (process.env.TEST_DATABASE_URL) {
    const target = new URL(process.env.TEST_DATABASE_URL);
    if (!['localhost', '127.0.0.1'].includes(target.hostname) || target.pathname !== '/ravecare_test' || target.username !== 'ci_only') {
      throw new Error('Refusing database reset outside the dedicated local ci_only/ravecare_test fixture');
    }
    engine = new pg.Client({ connectionString: process.env.TEST_DATABASE_URL });
    await engine.connect();
    await engine.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public; DROP ROLE IF EXISTS ravecare_api');
  } else { engine = new PGlite(); await engine.waitReady; }
  await migrate(engine);
  const database = {
    async transaction(work) {
      await engine.query('BEGIN');
      try {
        await engine.query('SET LOCAL ROLE ravecare_api');
        const result = await work(engine);
        await engine.query('COMMIT');
        return result;
      } catch (error) { await engine.query('ROLLBACK'); throw error; }
    }
  };
  const store = new Store(database);
  const vault = createVault(randomBytes(32).toString('base64'));
  const app = await buildApp({ store, vault, origin, production: true, loginLimit: 100, ...options });
  await app.ready();
  async function createUser(role = 'patient') {
    const id = randomUUID();
    const email = `${id}@example.test`;
    await engine.query('INSERT INTO users (id,email_index,profile_ciphertext,password_hash,role) VALUES ($1,$2,$3,$4,$5)', [id, vault.emailIndex(email), vault.encrypt({ name: 'Pessoa fictícia', email }, `profile:${id}`), await hashPassword(password), role]);
    const response = await app.inject({ method: 'POST', url: '/auth/login', headers: { origin }, payload: { email, password } });
    if (response.statusCode !== 200) throw new Error('Fixture login failed');
    return { id, role, email, cookie: response.headers['set-cookie'].split(';')[0] };
  }
  function request(user, method, url, payload, headers = {}) {
    return app.inject({ method, url, headers: { origin, ...(user ? { cookie: user.cookie } : {}), ...headers }, ...(payload ? { payload } : {}) });
  }
  return { engine, database, store, vault, app, createUser, request, async close() { await app.close(); if (engine.close) await engine.close(); else await engine.end(); } };
}
