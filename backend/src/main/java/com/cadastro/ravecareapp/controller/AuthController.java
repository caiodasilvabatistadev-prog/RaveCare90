package com.cadastro.ravecareapp.controller;

import com.cadastro.ravecareapp.dto.request.EmailVerificationRequest;
import com.cadastro.ravecareapp.dto.request.LoginRequest;
import com.cadastro.ravecareapp.dto.response.LoginResponse;
import com.cadastro.ravecareapp.service.AuthService;
import com.cadastro.ravecareapp.service.EmailVerificationService;
import com.cadastro.ravecareapp.service.RegistrationRateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService auth;
    private final EmailVerificationService emailVerification;
    private final RegistrationRateLimiter rateLimiter;

    public AuthController(
            AuthService auth,
            EmailVerificationService emailVerification,
            RegistrationRateLimiter rateLimiter
    ) {
        this.auth = auth;
        this.emailVerification = emailVerification;
        this.rateLimiter = rateLimiter;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest servletRequest
    ) {
        rateLimiter.check("login", servletRequest.getRemoteAddr());
        return ResponseEntity.ok(auth.login(request));
    }

    @PostMapping("/verify-email")
    public ResponseEntity<Void> verifyEmail(
            @Valid @RequestBody EmailVerificationRequest request,
            HttpServletRequest servletRequest
    ) {
        rateLimiter.check("email-verification", servletRequest.getRemoteAddr());
        emailVerification.verify(request.token());
        return ResponseEntity.noContent().build();
    }
}
