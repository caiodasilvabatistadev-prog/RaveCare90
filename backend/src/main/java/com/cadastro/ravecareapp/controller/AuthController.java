package com.cadastro.ravecareapp.controller;

import com.cadastro.ravecareapp.dto.request.GoogleLoginRequest;
import com.cadastro.ravecareapp.dto.request.LoginRequest;
import com.cadastro.ravecareapp.dto.response.LoginResponse;
import com.cadastro.ravecareapp.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService auth;

    public AuthController(AuthService auth) {
        this.auth = auth;
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
}