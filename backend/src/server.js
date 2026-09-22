import { readConfig } from './config.js';
import { createVault } from './security.js';
import { connectDatabase } from './database.js';
import { Store } from './store.js';
import { buildApp } from './app.js';

let db;
try {
  const config = readConfig();
  const vault = createVault(config.encryptionKey);
  db = connectDatabase(config.databaseUrl);
  await db.assertRestrictedRole();
  const app = await buildApp({ ...config, store: new Store(db), vault });
  app.addHook('onClose', () => db.close());
  await app.listen({ host: config.host, port: config.port });
  for (const signal of ['SIGTERM', 'SIGINT']) process.once(signal, () => app.close());
  console.info('RAVECARE90 API ready');
} catch {
  // Connection errors may contain credentials or patient data. Never print raw errors.
  console.error('API startup failed. Check protected configuration and database migrations.');
  if (db) await db.close();
  process.exitCode = 1;
}
