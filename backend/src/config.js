import { readFileSync } from 'node:fs';
export function secret(env, name) {
  if (env[name] && env[`${name}_FILE`]) throw new Error(`Use one source for ${name}`);
  return env[`${name}_FILE`] ? readFileSync(env[`${name}_FILE`], 'utf8').trim() : env[name];
}
export function readConfig(env = process.env) {
  const databaseUrl = secret(env, 'DATABASE_URL');
  const encryptionKey = secret(env, 'DATA_ENCRYPTION_KEY');
  if (!databaseUrl || !encryptionKey || !env.APP_ORIGIN) throw new Error('Missing required configuration');
  const origin = new URL(env.APP_ORIGIN);
  if (origin.origin !== env.APP_ORIGIN || origin.username || origin.password) throw new Error('APP_ORIGIN must be an origin');
  if (!['http:', 'https:'].includes(origin.protocol)) throw new Error('Invalid origin protocol');
  const production = env.NODE_ENV === 'production';
  if (production && origin.protocol !== 'https:') throw new Error('Production requires HTTPS');
  const port = Number(env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid port');
  return { databaseUrl, encryptionKey, origin: origin.origin, production, port, host: env.HOST || '127.0.0.1' };
}
