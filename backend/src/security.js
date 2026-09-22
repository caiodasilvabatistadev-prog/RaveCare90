import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHash, createHmac, createCipheriv, createDecipheriv, hkdfSync } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);
const options = { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const derived = await scrypt(password, salt, 64, options);
  return `scrypt$${salt}$${derived.toString('hex')}`;
}
export async function verifyPassword(password, encoded) {
  const [scheme, salt, value] = encoded.split('$');
  if (scheme !== 'scrypt' || !/^[a-f0-9]{32}$/.test(salt) || !/^[a-f0-9]{128}$/.test(value)) return false;
  const derived = await scrypt(password, salt, 64, options);
  return timingSafeEqual(derived, Buffer.from(value, 'hex'));
}
export const digest = value => createHash('sha256').update(value).digest('hex');
export const newToken = () => randomBytes(32).toString('base64url');
export function createVault(base64Key) {
  const master = Buffer.from(base64Key, 'base64');
  if (master.length !== 32 || master.toString('base64') !== base64Key) throw new Error('Invalid encryption key');
  const key = Buffer.from(hkdfSync('sha256', master, Buffer.alloc(0), 'ravecare90:data:v1', 32));
  const indexKey = Buffer.from(hkdfSync('sha256', master, Buffer.alloc(0), 'ravecare90:email-index:v1', 32));
  return {
    emailIndex(email) { return createHmac('sha256', indexKey).update(email.trim().toLowerCase()).digest('hex'); },
    encrypt(value, context) {
      const iv = randomBytes(12);
      const cipher = createCipheriv('aes-256-gcm', key, iv);
      cipher.setAAD(Buffer.from(context));
      const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()]);
      return ['v1', iv.toString('base64'), cipher.getAuthTag().toString('base64'), encrypted.toString('base64')].join('.');
    },
    decrypt(value, context) {
      const [version, nonce, tag, payload, extra] = value.split('.');
      if (version !== 'v1' || !nonce || !tag || !payload || extra) throw new Error('Invalid encrypted data');
      const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(nonce, 'base64'));
      decipher.setAAD(Buffer.from(context));
      decipher.setAuthTag(Buffer.from(tag, 'base64'));
      return JSON.parse(Buffer.concat([decipher.update(Buffer.from(payload, 'base64')), decipher.final()]).toString('utf8'));
    }
  };
}
