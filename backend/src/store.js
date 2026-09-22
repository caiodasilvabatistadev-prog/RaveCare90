export class Store {
  constructor(database) { this.database = database; }
  async tx(actorId, work) {
    return this.database.transaction(async client => {
      await client.query("SELECT set_config('app.actor_id', $1, true)", [actorId || '']);
      return work(client);
    });
  }
  async createUser(user) {
    await this.tx(null, db => db.query('INSERT INTO users (id,email_index,profile_ciphertext,password_hash) VALUES ($1,$2,$3,$4)', [user.id, user.emailIndex, user.profile, user.passwordHash]));
  }
  async findLogin(index) {
    return this.tx(null, async db => (await db.query('SELECT id,password_hash,role FROM users WHERE email_index=$1', [index])).rows[0]);
  }
  async createSession(hash, id, expires) {
    await this.tx(id, db => db.query('INSERT INTO sessions (token_hash,user_id,expires_at) VALUES ($1,$2,$3)', [hash, id, expires]));
  }
  async session(hash) {
    return this.tx(null, async db => (await db.query('SELECT u.id,u.role,u.profile_ciphertext FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at > now()', [hash])).rows[0]);
  }
  async deleteSession(hash) { await this.tx(null, db => db.query('DELETE FROM sessions WHERE token_hash=$1', [hash])); }
  async readAnamnesis(actor, patient) {
    return this.tx(actor.id, async db => {
      const row = (await db.query('SELECT * FROM anamneses WHERE patient_id=$1', [patient])).rows[0];
      if (row) await this.audit(db, actor.id, 'anamnesis.read', patient);
      return row;
    });
  }
  async saveAnamnesis(actor, data, ciphertext) {
    return this.tx(actor.id, async db => {
      let result;
      if (data.version === 0) {
        result = await db.query("INSERT INTO anamneses (patient_id,answers_ciphertext,status,version) VALUES ($1,$2,'draft',1) ON CONFLICT DO NOTHING RETURNING version,status", [actor.id, ciphertext]);
      } else {
        result = await db.query("UPDATE anamneses SET answers_ciphertext=$2,version=version+1,updated_at=now() WHERE patient_id=$1 AND version=$3 AND status='draft' RETURNING version,status", [actor.id, ciphertext, data.version]);
      }
      if (!result.rows[0]) return null;
      await this.audit(db, actor.id, 'anamnesis.save', actor.id);
      return result.rows[0];
    });
  }
  async submit(actor, version, validate) {
    return this.tx(actor.id, async db => {
      const row = (await db.query("SELECT * FROM anamneses WHERE patient_id=$1 AND version=$2 AND status='draft' FOR UPDATE", [actor.id, version])).rows[0];
      if (!row) return null;
      validate(row);
      const result = await db.query("UPDATE anamneses SET status='submitted',version=version+1,updated_at=now() WHERE patient_id=$1 RETURNING version,status", [actor.id]);
      await this.audit(db, actor.id, 'anamnesis.submit', actor.id);
      return result.rows[0];
    });
  }
  async patients(actor) {
    return this.tx(actor.id, async db => (await db.query("SELECT u.id,u.profile_ciphertext,a.status,a.version FROM care_assignments c JOIN users u ON u.id=c.patient_id AND u.role='patient' LEFT JOIN anamneses a ON a.patient_id=u.id WHERE c.professional_id=$1 ORDER BY u.created_at DESC LIMIT 100", [actor.id])).rows);
  }
  async audit(db, actor, action, resource) {
    await db.query('INSERT INTO audit_events (actor_id,action,resource_id) VALUES ($1,$2,$3)', [actor, action, resource]);
  }
}
