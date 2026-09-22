import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { hashPassword, verifyPassword, createVault, digest, newToken } from '../src/security.js';
import { readConfig, secret } from '../src/config.js';
import { answers, registration } from '../src/schema.js';

test('passwords use salted scrypt hashes, reject wrong passwords and malformed hashes', async () => {
  const value = 'Password-only-for-tests';
  const a = await hashPassword(value); const b = await hashPassword(value);
  assert.notEqual(a, b); assert.ok(!a.includes(value));
  assert.equal(await verifyPassword(value, a), true);
  assert.equal(await verifyPassword('wrong', a), false);
  assert.equal(await verifyPassword(value, 'invalid'), false);
});
test('authenticated encryption is random, bound to patient and rejects tampering', () => {
  const vault = createVault(randomBytes(32).toString('base64'));
  const data = { clinical: 'Sensitive synthetic information' };
  const encrypted = vault.encrypt(data, 'patient:1');
  assert.notEqual(encrypted, vault.encrypt(data, 'patient:1'));
  assert.ok(!encrypted.includes(data.clinical));
  assert.deepEqual(vault.decrypt(encrypted, 'patient:1'), data);
  assert.throws(() => vault.decrypt(encrypted, 'patient:2'));
  const parts = encrypted.split('.'); parts[2] = randomBytes(16).toString('base64');
  assert.throws(() => vault.decrypt(parts.join('.'), 'patient:1'));
  assert.throws(() => vault.decrypt('v2.invalid', 'patient:1'));
  assert.throws(() => createVault('short'));
  assert.equal(vault.emailIndex(' PERSON@example.test '), vault.emailIndex('person@example.test'));
  assert.notEqual(vault.emailIndex('person@example.test'), digest('person@example.test'));
  assert.notEqual(newToken(), newToken());
});
test('configuration fails closed with missing secrets or insecure production origin', () => {
  const env = { DATABASE_URL: 'postgres://test', DATA_ENCRYPTION_KEY: 'test', APP_ORIGIN: 'https://app.example.test', NODE_ENV: 'production' };
  assert.equal(readConfig(env).production, true);
  assert.equal(readConfig({ ...env, NODE_ENV: 'development', APP_ORIGIN: 'http://localhost:8081' }).port, 3000);
  for (const patch of [{ DATABASE_URL: '' }, { APP_ORIGIN: 'http://app.example.test' }, { APP_ORIGIN: 'https://app.example.test/path' }, { PORT: 'abc' }, { PORT: '70000' }, { APP_ORIGIN: 'ftp://example.test' }]) assert.throws(() => readConfig({ ...env, ...patch }));
  assert.throws(() => secret({ KEY: 'one', KEY_FILE: 'two' }, 'KEY'));
});
test('clinical validation rejects unexpected fields, invalid scores and role injection', () => {
  assert.equal(answers.safeParse({ sleepScore: 11 }).success, false);
  assert.equal(answers.safeParse({ sleepScore: -1 }).success, false);
  assert.equal(answers.safeParse({ additionalInfo: 'x'.repeat(3001) }).success, false);
  assert.equal(answers.safeParse({ patientId: 'someone-else' }).success, false);
  assert.equal(answers.safeParse({ birthDate: '2026-02-31' }).success, false);
  assert.equal(registration.safeParse({ name: 'Test', email: 'test@example.test', password: 'short' }).success, false);
  assert.equal(registration.safeParse({ name: 'Test', email: 'test@example.test', password: 'Long-Test-Password', role: 'professional' }).success, false);
});
