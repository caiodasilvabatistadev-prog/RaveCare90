package com.cadastro.ravecareapp.service;

import com.cadastro.ravecareapp.entity.EmailVerificationToken;
import com.cadastro.ravecareapp.entity.User;
import com.cadastro.ravecareapp.enums.UserRole;
import com.cadastro.ravecareapp.exception.BusinessException;
import com.cadastro.ravecareapp.repository.EmailVerificationTokenRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EmailVerificationServiceTest {

    @Mock
    private EmailVerificationTokenRepository tokenRepository;

    @Mock
    private JavaMailSender mailSender;

    private EmailVerificationService service;

    @BeforeEach
    void setUp() {
        service = new EmailVerificationService(
                tokenRepository,
                mailSender,
                "http://localhost:5173"
        );
    }

    @Test
    void shouldActivateUserAndConsumeValidToken() throws Exception {
        String rawToken = "valid-token";
        User user = new User("Vinicius", "vinicius@example.com", "password", UserRole.PATIENT);
        EmailVerificationToken token = new EmailVerificationToken(
                user,
                hash(rawToken),
                LocalDateTime.now().plusHours(1)
        );
        when(tokenRepository.findByTokenHash(hash(rawToken))).thenReturn(Optional.of(token));

        service.verify(rawToken);

        assertTrue(user.isEmailVerified());
        assertTrue(user.isActive());
        assertFalse(token.isUsable(LocalDateTime.now()));
    }

    @Test
    void shouldRejectExpiredTokenWithoutActivatingUser() throws Exception {
        String rawToken = "expired-token";
        User user = new User("Vinicius", "vinicius@example.com", "password", UserRole.PATIENT);
        EmailVerificationToken token = new EmailVerificationToken(
                user,
                hash(rawToken),
                LocalDateTime.now().minusMinutes(1)
        );
        when(tokenRepository.findByTokenHash(hash(rawToken))).thenReturn(Optional.of(token));

        assertThrows(BusinessException.class, () -> service.verify(rawToken));

        assertFalse(user.isEmailVerified());
        assertFalse(user.isActive());
    }

    @Test
    void shouldPersistTokenAndSendConfirmationMessage() {
        User user = new User("Vinicius", "vinicius@example.com", "password", UserRole.PATIENT);

        service.sendFor(user);

        verify(tokenRepository).save(org.mockito.ArgumentMatchers.any(EmailVerificationToken.class));
        verify(mailSender).send(org.mockito.ArgumentMatchers.any(SimpleMailMessage.class));
    }

    private String hash(String value) throws Exception {
        byte[] digest = MessageDigest.getInstance("SHA-256")
                .digest(value.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(digest);
    }
}
