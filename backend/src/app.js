import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { randomUUID } from 'node:crypto';
import { registration, login, saveAnamnesis, submitAnamnesis, patientId } from './schema.js';
import { hashPassword, verifyPassword, newToken, digest } from './security.js';

function failure(statusCode, message) { return Object.assign(new Error(message), { statusCode }); }
function parse(schema, value) {
  const result = schema.safeParse(value);
  if (!result.success) throw failure(400, 'Dados inválidos. Confira os campos.');
  return result.data;
}
export async function buildApp({ store, vault, origin, production = false, loginLimit = 10 }) {
  const app = Fastify({ logger: false, bodyLimit: 32768, trustProxy: false });
  const cookieName = production ? '__Host-ravecare_session' : 'ravecare_session';
  const dummyHash = await hashPassword(newToken());
  await app.register(cookie);
  await app.register(helmet);
  await app.register(rateLimit, { max: 120, timeWindow: '1 minute' });
  app.decorateRequest('actor', null);
  app.addHook('onRequest', async (req, reply) => {
    reply.header('Cache-Control', 'no-store').header('Pragma', 'no-cache');
    if (req.headers.origin === origin) {
      reply.header('Access-Control-Allow-Origin', origin).header('Access-Control-Allow-Credentials', 'true').header('Vary', 'Origin');
    }
    if (req.method === 'OPTIONS') {
      if (req.headers.origin !== origin) throw failure(403, 'Origem não permitida.');
      reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS').header('Access-Control-Allow-Headers', 'Content-Type').code(204).send();
      return;
    }
    if (!['GET', 'HEAD'].includes(req.method) && req.headers.origin !== origin) throw failure(403, 'Origem não permitida.');
  });
  app.setErrorHandler((error, req, reply) => {
    const status = error.statusCode >= 400 && error.statusCode < 500 ? error.statusCode : 500;
    reply.code(status).send({ error: status === 500 ? 'Não foi possível concluir a operação.' : status === 429 ? 'Muitas tentativas. Aguarde e tente novamente.' : status === 413 ? 'Conteúdo excede o limite permitido.' : status === 400 ? 'Dados inválidos. Confira os campos.' : error.message });
  });
  async function authenticated(req) {
    const token = req.cookies[cookieName];
    if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) throw failure(401, 'Autenticação necessária.');
    req.actor = await store.session(digest(token));
    if (!req.actor) throw failure(401, 'Autenticação necessária.');
  }
  async function patient(req) {
    await authenticated(req);
    if (req.actor.role !== 'patient') throw failure(403, 'Acesso não permitido.');
  }
  async function professional(req) {
    await authenticated(req);
    if (req.actor.role !== 'professional') throw failure(403, 'Acesso não permitido.');
  }
  app.get('/health', async () => ({ status: 'ok' }));
  app.post('/auth/register', { config: { rateLimit: { max: 5, timeWindow: '1 minute' } } }, async (req, reply) => {
    const input = parse(registration, req.body);
    const id = randomUUID();
    const user = { id, emailIndex: vault.emailIndex(input.email), profile: vault.encrypt({ name: input.name, email: input.email }, `profile:${id}`), passwordHash: await hashPassword(input.password), role: 'patient' };
    try { await store.createUser(user); }
    catch (error) { if (error.code !== '23505') throw error; }
    return reply.code(202).send({ message: 'Solicitação processada. Se já possui cadastro, entre com suas credenciais.' });
  });
  app.post('/auth/login', { config: { rateLimit: { max: loginLimit, timeWindow: '15 minutes' } } }, async (req, reply) => {
    const input = parse(login, req.body);
    const user = await store.findLogin(vault.emailIndex(input.email));
    const valid = await verifyPassword(input.password, user?.password_hash || dummyHash);
    if (!user || !valid) throw failure(401, 'Credenciais inválidas.');
    const token = newToken();
    await store.createSession(digest(token), user.id, new Date(Date.now() + 8 * 60 * 60 * 1000));
    reply.setCookie(cookieName, token, { httpOnly: true, secure: production, sameSite: 'strict', path: '/', maxAge: 8 * 60 * 60 });
    return { user: { id: user.id, role: user.role } };
  });
  app.post('/auth/logout', { preHandler: authenticated }, async (req, reply) => {
    await store.deleteSession(digest(req.cookies[cookieName]));
    reply.clearCookie(cookieName, { httpOnly: true, secure: production, sameSite: 'strict', path: '/' });
    return reply.code(204).send();
  });
  app.get('/auth/me', { preHandler: authenticated }, async req => ({ user: { id: req.actor.id, role: req.actor.role, ...vault.decrypt(req.actor.profile_ciphertext, `profile:${req.actor.id}`) } }));
  function present(row) {
    return { answers: vault.decrypt(row.answers_ciphertext, `anamnesis:${row.patient_id}`), status: row.status, version: row.version, updatedAt: row.updated_at };
  }
  app.get('/anamnesis', { preHandler: patient }, async req => {
    const row = await store.readAnamnesis(req.actor, req.actor.id);
    return row ? present(row) : { answers: {}, status: 'not_started', version: 0 };
  });
  app.put('/anamnesis', { preHandler: patient }, async req => {
    const input = parse(saveAnamnesis, req.body);
    const result = await store.saveAnamnesis(req.actor, input, vault.encrypt(input.answers, `anamnesis:${req.actor.id}`));
    if (!result) throw failure(409, 'A versão mudou ou o formulário já foi enviado. Atualize a página.');
    return result;
  });
  app.post('/anamnesis/submit', { preHandler: patient }, async req => {
    const input = parse(submitAnamnesis, req.body);
    const result = await store.submit(req.actor, input.version, row => {
      const answers = vault.decrypt(row.answers_ciphertext, `anamnesis:${req.actor.id}`);
      if (!answers.goals?.length || !answers.successDefinition?.trim()) throw failure(400, 'Informe objetivos e expectativas antes de enviar.');
    });
    if (!result) throw failure(409, 'A versão mudou ou o formulário já foi enviado. Atualize a página.');
    return result;
  });
  app.get('/professional/patients', { preHandler: professional }, async req => ({ patients: (await store.patients(req.actor)).map(row => ({ id: row.id, name: vault.decrypt(row.profile_ciphertext, `profile:${row.id}`).name, status: row.status || 'not_started', version: row.version || 0 })) }));
  app.get('/professional/patients/:id/anamnesis', { preHandler: professional }, async req => {
    const id = parse(patientId, req.params.id);
    const row = await store.readAnamnesis(req.actor, id);
    if (!row) throw failure(404, 'Registro não encontrado.');
    return present(row);
  });
  return app;
}
