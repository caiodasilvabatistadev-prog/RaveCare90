import pg from 'pg';
import { secret } from '../src/config.js';
import { migrate } from '../src/operations.js';
let client;
try {
  const connectionString = secret(process.env, 'MIGRATION_DATABASE_URL');
  if (!connectionString) throw new Error('Missing migration credential');
  client = new pg.Client({ connectionString });
  await client.connect();
  await migrate(client);
  console.info('Migrations complete');
} catch {
  console.error('Migration failed. Review database permissions in a protected environment.');
  process.exitCode = 1;
} finally { if (client) await client.end(); }
