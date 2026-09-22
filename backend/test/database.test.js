import { test } from 'node:test';
import assert from 'node:assert/strict';
import { connectDatabase } from '../src/database.js';

test('database transactions commit/rollback and always release connections', async () => {
  const calls = [];
  class Pool {
    async connect() { return { query: async sql => calls.push(sql), release: () => calls.push('release') }; }
    async end() { calls.push('close'); }
  }
  const database = connectDatabase('test-only', Pool);
  assert.equal(await database.transaction(async () => 'value'), 'value');
  assert.deepEqual(calls, ['BEGIN', 'COMMIT', 'release']);
  calls.length = 0;
  await assert.rejects(database.transaction(async () => { throw new Error('failure'); }));
  assert.deepEqual(calls, ['BEGIN', 'ROLLBACK', 'release']);
  await database.close(); assert.equal(calls.at(-1), 'close');
});

test('API startup rejects superuser, BYPASSRLS and owner credentials', async () => {
  for (const config of [{ rolsuper: true }, { rolbypassrls: true }, { owner: true }, {}]) {
    class Pool {
      async query(sql) { return sql.includes('pg_roles') ? { rows: [{ rolsuper: false, rolbypassrls: false, ...config }] } : { rows: config.owner ? [{}] : [] }; }
    }
    const database = connectDatabase('test-only', Pool);
    if (Object.keys(config).length) await assert.rejects(database.assertRestrictedRole());
    else await database.assertRestrictedRole();
  }
});
