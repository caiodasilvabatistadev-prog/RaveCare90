package com.cadastro.ravecareapp.dto.request;

import jakarta.validation.constraints.NotBlank;

public record EmailVerificationRequest(@NotBlank String token) {
}
