package com.cadastro.ravecareapp.dto.response;
import java.time.LocalDateTime; import java.util.UUID;
public record AnamnesisResponse(UUID id, UUID patientId, String currentComplaint, String medicalHistory, String medications, String allergies, LocalDateTime updatedAt) {}
