package com.cadastro.ravecareapp.dto.request;
import jakarta.validation.constraints.NotBlank; import jakarta.validation.constraints.Size;
public record AnamnesisRequest(@NotBlank @Size(max=5000) String currentComplaint, @Size(max=10000) String medicalHistory, @Size(max=5000) String medications, @Size(max=5000) String allergies) {}
