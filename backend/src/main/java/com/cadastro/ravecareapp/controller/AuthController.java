package com.cadastro.ravecareapp.controller;

import com.cadastro.ravecareapp.dto.request.GoogleLoginRequest;
import com.cadastro.ravecareapp.dto.request.EmailVerificationRequest;
import com.cadastro.ravecareapp.dto.request.LoginRequest;
import com.cadastro.ravecareapp.dto.response.LoginResponse;
import com.cadastro.ravecareapp.service.AuthService;
import com.cadastro.ravecareapp.service.EmailVerificationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService auth;
    private final EmailVerificationService emailVerification;

    public AuthController(AuthService auth, EmailVerificationService emailVerification) {
        this.auth = auth;
        this.emailVerification = emailVerification;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        return ResponseEntity.ok(auth.login(request));
    }

    @PostMapping("/google")
    public ResponseEntity<LoginResponse> googleLogin(
            @Valid @RequestBody GoogleLoginRequest request
    ) {
        return ResponseEntity.ok(auth.googleLogin(request));
    }

    @PostMapping("/verify-email")
    public ResponseEntity<Void> verifyEmail(
            @Valid @RequestBody EmailVerificationRequest request
    ) {
        emailVerification.verify(request.token());
        return ResponseEntity.noContent().build();
    }
}
