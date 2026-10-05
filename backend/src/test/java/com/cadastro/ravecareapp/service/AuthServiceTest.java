package com.cadastro.ravecareapp.service;

import com.cadastro.ravecareapp.config.JwtService;
import com.cadastro.ravecareapp.dto.request.LoginRequest;
import com.cadastro.ravecareapp.entity.User;
import com.cadastro.ravecareapp.enums.UserRole;
import com.cadastro.ravecareapp.exception.BusinessException;
import com.cadastro.ravecareapp.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private GoogleTokenVerifier googleTokenVerifier;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(
                userRepository,
                passwordEncoder,
                jwtService,
                googleTokenVerifier
        );
    }

    @Test
    void shouldRejectPasswordLoginBeforeEmailIsConfirmed() {
        User unverifiedUser = new User(
                "Vinicius",
                "vinicius@example.com",
                "encoded-password",
                UserRole.PATIENT
        );
        when(userRepository.findByEmailIgnoreCase("vinicius@example.com"))
                .thenReturn(Optional.of(unverifiedUser));

        assertThrows(
                BusinessException.class,
                () -> authService.login(new LoginRequest(
                        "vinicius@example.com",
                        "password"
                ))
        );

        verify(userRepository).findByEmailIgnoreCase("vinicius@example.com");
    }
}
