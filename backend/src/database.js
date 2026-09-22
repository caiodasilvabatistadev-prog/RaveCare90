import pg from 'pg';
export function connectDatabase(url, Pool = pg.Pool) {
  const pool = new Pool({ connectionString: url, max: 10, connectionTimeoutMillis: 5000, statement_timeout: 10000 });
  return {
    async transaction(work) {
      const client = await pool.connect();
      try { await client.query('BEGIN'); const result = await work(client); await client.query('COMMIT'); return result; }
      catch (error) { await client.query('ROLLBACK'); throw error; }
      finally { client.release(); }
    },
    async assertRestrictedRole() {
      const { rows } = await pool.query("SELECT rolsuper,rolbypassrls FROM pg_roles WHERE rolname=current_user");
      if (rows[0].rolsuper || rows[0].rolbypassrls) throw new Error('API database role must enforce row security');
      const ownership = await pool.query("SELECT 1 FROM pg_tables WHERE schemaname='public' AND tableowner=current_user");
      if (ownership.rows.length) throw new Error('API must not own application tables');
    },
    close: () => pool.end()
  };
}
