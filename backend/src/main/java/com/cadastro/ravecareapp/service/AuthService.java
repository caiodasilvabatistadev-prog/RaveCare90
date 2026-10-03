package com.cadastro.ravecareapp.service;

import com.cadastro.ravecareapp.config.JwtService;
import com.cadastro.ravecareapp.dto.request.GoogleLoginRequest;
import com.cadastro.ravecareapp.dto.request.LoginRequest;
import com.cadastro.ravecareapp.dto.response.LoginResponse;
import com.cadastro.ravecareapp.dto.response.UserResponse;
import com.cadastro.ravecareapp.entity.User;
import com.cadastro.ravecareapp.enums.UserRole;
import com.cadastro.ravecareapp.exception.BusinessException;
import com.cadastro.ravecareapp.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository users;
    private final PasswordEncoder passwords;
    private final JwtService jwt;
    private final GoogleTokenVerifier googleTokenVerifier;
    public AuthService(
            UserRepository users,
            PasswordEncoder passwords,
            JwtService jwt,
            GoogleTokenVerifier googleTokenVerifier
    ) {
        this.users = users;
        this.passwords = passwords;
        this.jwt = jwt;
        this.googleTokenVerifier = googleTokenVerifier;
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        User user = users
                .findByEmailIgnoreCase(request.email().trim().toLowerCase())
                .orElseThrow(() -> new BusinessException("Invalid credentials"));

        if (!user.isActive()
                || !passwords.matches(request.password(), user.getPassword())) {
            throw new BusinessException("Invalid credentials");
        }

        return createLoginResponse(user);
    }

    @Transactional
    public LoginResponse googleLogin(GoogleLoginRequest request) {

        GoogleTokenVerifier.GoogleUser googleUser =
                googleTokenVerifier.verify(request.idToken());

        User user = users
                .findByEmailIgnoreCase(googleUser.email())
                .orElseGet(() -> createGoogleUser(googleUser));

        if (!user.isActive()) {
            throw new BusinessException("User is inactive");
        }

        return createLoginResponse(user);
    }

    private User createGoogleUser(
            GoogleTokenVerifier.GoogleUser googleUser
    ) {
        String name = googleUser.name();

        if (name == null || name.isBlank()) {
            name = googleUser.email().split("@")[0];
        }

        String unavailablePassword =
                passwords.encode(UUID.randomUUID().toString());

        User user = new User(
                name,
                googleUser.email(),
                unavailablePassword,
                UserRole.PATIENT
        );

        return users.save(user);
    }

    private LoginResponse createLoginResponse(User user) {

        UserResponse profile = new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );

        return new LoginResponse(
                jwt.issue(user),
                "Bearer",
                jwt.expiresIn(),
                profile
        );
    }
}