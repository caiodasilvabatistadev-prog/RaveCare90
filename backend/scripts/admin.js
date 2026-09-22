// JSON on stdin avoids passwords in command arguments and shell history.
import pg from 'pg';
import { secret } from '../src/config.js';
import { createVault } from '../src/security.js';
import { administer } from '../src/operations.js';
let client;
try {
  const connectionString = secret(process.env, 'MIGRATION_DATABASE_URL');
  if (!connectionString) throw new Error('Missing administration credential');
  const vault = createVault(secret(process.env, 'DATA_ENCRYPTION_KEY'));
  let raw = '';
  for await (const chunk of process.stdin) { raw += chunk; if (raw.length > 4096) throw new Error('Input too large'); }
  client = new pg.Client({ connectionString });
  await client.connect();
  const result = await administer(client, vault, process.argv[2], JSON.parse(raw));
  process.stdout.write(JSON.stringify(result) + '\n');
} catch {
  console.error('Administration failed. Check protected input and permissions.');
  process.exitCode = 1;
} finally { if (client) await client.end(); }
