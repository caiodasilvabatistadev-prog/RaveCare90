package com.cadastro.ravecareapp.repository;
import com.cadastro.ravecareapp.entity.Anamnesis;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional; import java.util.UUID;
public interface AnamnesisRepository extends JpaRepository<Anamnesis, UUID> { Optional<Anamnesis> findByPatientId(UUID patientId); }
