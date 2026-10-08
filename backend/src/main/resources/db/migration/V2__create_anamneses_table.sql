CREATE TABLE anamneses (
    id UUID PRIMARY KEY,
    patient_id UUID NOT NULL UNIQUE,
    current_complaint TEXT NOT NULL,
    medical_history TEXT,
    medications TEXT,
    allergies TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_anamneses_patient FOREIGN KEY (patient_id) REFERENCES users(id)
);
