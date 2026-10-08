package com.cadastro.ravecareapp.service;

import com.cadastro.ravecareapp.config.JwtService;
import com.cadastro.ravecareapp.dto.request.LoginRequest;
import com.cadastro.ravecareapp.dto.response.LoginResponse;
import com.cadastro.ravecareapp.dto.response.UserResponse;
import com.cadastro.ravecareapp.entity.User;
import com.cadastro.ravecareapp.exception.BusinessException;
import com.cadastro.ravecareapp.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository users;
    private final PasswordEncoder passwords;
    private final JwtService jwt;
    public AuthService(
            UserRepository users,
            PasswordEncoder passwords,
            JwtService jwt
    ) {
        this.users = users;
        this.passwords = passwords;
        this.jwt = jwt;
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        User user = users
                .findByEmailIgnoreCase(request.email().trim().toLowerCase())
                .orElseThrow(() -> new BusinessException("Invalid credentials"));

        if (!user.isActive()
                || !user.isEmailVerified()
                || !passwords.matches(request.password(), user.getPassword())) {
            throw new BusinessException("Invalid credentials");
        }

        return createLoginResponse(user);
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
