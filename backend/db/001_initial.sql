CREATE ROLE ravecare_api NOLOGIN NOSUPERUSER NOBYPASSRLS;
REVOKE CREATE ON SCHEMA public FROM PUBLIC;

CREATE TABLE users (
  id uuid PRIMARY KEY,
  email_index text UNIQUE NOT NULL,
  profile_ciphertext text NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'professional')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE sessions (
  token_hash text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id),
  expires_at timestamptz NOT NULL
);
CREATE INDEX sessions_user_id ON sessions(user_id);
CREATE TABLE care_assignments (
  professional_id uuid NOT NULL REFERENCES users(id),
  patient_id uuid NOT NULL REFERENCES users(id),
  PRIMARY KEY (professional_id, patient_id),
  CHECK (professional_id <> patient_id)
);
CREATE TABLE anamneses (
  patient_id uuid PRIMARY KEY REFERENCES users(id),
  answers_ciphertext text NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'submitted')),
  version integer NOT NULL CHECK (version > 0),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE audit_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  actor_id uuid NOT NULL REFERENCES users(id),
  action text NOT NULL,
  resource_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE anamneses ENABLE ROW LEVEL SECURITY;
ALTER TABLE anamneses FORCE ROW LEVEL SECURITY;
CREATE POLICY clinical_read ON anamneses FOR SELECT TO ravecare_api USING (
  patient_id = nullif(current_setting('app.actor_id', true), '')::uuid
  OR EXISTS (
    SELECT 1 FROM care_assignments ca
    JOIN users professional ON professional.id = ca.professional_id AND professional.role = 'professional'
    WHERE ca.patient_id = anamneses.patient_id
      AND ca.professional_id = nullif(current_setting('app.actor_id', true), '')::uuid
  )
);
CREATE POLICY clinical_insert ON anamneses FOR INSERT TO ravecare_api WITH CHECK (
  patient_id = nullif(current_setting('app.actor_id', true), '')::uuid
  AND EXISTS (SELECT 1 FROM users WHERE id = patient_id AND role = 'patient')
);
CREATE POLICY clinical_update ON anamneses FOR UPDATE TO ravecare_api USING (
  patient_id = nullif(current_setting('app.actor_id', true), '')::uuid AND status = 'draft'
) WITH CHECK (patient_id = nullif(current_setting('app.actor_id', true), '')::uuid);

GRANT USAGE ON SCHEMA public TO ravecare_api;
GRANT SELECT ON users TO ravecare_api;
GRANT INSERT (id,email_index,profile_ciphertext,password_hash) ON users TO ravecare_api;
GRANT SELECT, INSERT, DELETE ON sessions TO ravecare_api;
GRANT SELECT ON care_assignments TO ravecare_api;
GRANT SELECT, INSERT, UPDATE ON anamneses TO ravecare_api;
GRANT INSERT ON audit_events TO ravecare_api;
GRANT USAGE ON SEQUENCE audit_events_id_seq TO ravecare_api;
-- No assignment mutation, role changes, schema changes or audit reads/deletes for runtime.
