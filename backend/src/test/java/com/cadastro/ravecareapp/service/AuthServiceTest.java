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
import com.cadastro.ravecareapp.dto.response.LoginResponse;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
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

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(
                userRepository,
                passwordEncoder,
                jwtService
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
        unverifiedUser.setActive(true);
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

    @Test
    void shouldRejectPasswordLoginForInactiveVerifiedAccount() {
        User inactiveUser = new User(
                "Vinicius",
                "vinicius@example.com",
                "encoded-password",
                UserRole.PATIENT
        );
        inactiveUser.setEmailVerified(true);
        when(userRepository.findByEmailIgnoreCase("vinicius@example.com"))
                .thenReturn(Optional.of(inactiveUser));
        assertThrows(
                BusinessException.class,
                () -> authService.login(new LoginRequest(
                        "vinicius@example.com",
                        "password"
                ))
        );
    }
    @Test
    void shouldReturnLoginResponseWhenCredentialsAreValid() {
        User user = new User(
                "VERDADE",
                "verdade@example.com",
                "encoded-password",
                UserRole.PATIENT
        );
        user.setActive(true);
        user.setEmailVerified(true);

        when(userRepository.findByEmailIgnoreCase("verdade@example.com"))
                .thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "encoded-password"))
                .thenReturn(true);
        when(jwtService.issue(user))
                .thenReturn("test-access-token");
        when(jwtService.expiresIn())
                .thenReturn(3600L);

        LoginRequest request = new LoginRequest(
                "verdade@example.com",
                "password"
        );

        LoginResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("test-access-token", response.accessToken());
        assertEquals("Bearer", response.tokenType());
        assertEquals(3600L, response.expiresIn());
        assertNotNull(response.user());
        assertEquals("VERDADE", response.user().name());
        assertEquals("verdade@example.com", response.user().email());
        assertEquals(UserRole.PATIENT, response.user().role());
        assertTrue(response.user().active());
    }
    @Test
    void shouldRejectLoginWhenPasswordIsIncorrect() {
        User user = new User(
                "Vinicius",
                "vinicius@example.com",
                "encoded-password",
                UserRole.PATIENT
        );
        user.setActive(true);
        user.setEmailVerified(true);

        when(userRepository.findByEmailIgnoreCase("vinicius@example.com"))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("senha-errada", "encoded-password"))
                .thenReturn(false);

        LoginRequest request = new LoginRequest(
                "vinicius@example.com",
                "senha-errada"
        );

        assertThrows(
                BusinessException.class,
                () -> authService.login(request)
        );

    }
}
