package com.cadastro.ravecareapp.service;

import com.cadastro.ravecareapp.dto.request.CreateUserRequest;
import com.cadastro.ravecareapp.entity.User;
import com.cadastro.ravecareapp.enums.UserRole;
import com.cadastro.ravecareapp.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private EmailVerificationService emailVerificationService;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldCreateUser() {
        CreateUserRequest request = new CreateUserRequest(
                "Vinicius",
                "VINICIUS@EXAMPLE.COM",
                "12345678"
        );

        ArgumentCaptor<User> savedUser =
                ArgumentCaptor.forClass(User.class);

        when(userRepository.findByEmailIgnoreCase("vinicius@example.com"))
                .thenReturn(java.util.Optional.empty());

        when(passwordEncoder.encode("12345678"))
                .thenReturn("encoded-password");

        when(userRepository.saveAndFlush(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        userService.requestRegistration(request);

        verify(passwordEncoder).encode("12345678");
        verify(userRepository).saveAndFlush(savedUser.capture());
        verify(emailVerificationService).sendFor(savedUser.getValue());

        assertFalse(savedUser.getValue().isEmailVerified());
    }

    @Test
    void shouldAlwaysCreatePublicRegistrationsAsPatients() {
        CreateUserRequest request = new CreateUserRequest(
                "Vinicius",
                "vinicius@example.com",
                "12345678"
        );

        when(userRepository.findByEmailIgnoreCase("vinicius@example.com"))
                .thenReturn(java.util.Optional.empty());
        when(passwordEncoder.encode("12345678"))
                .thenReturn("encoded-password");
        when(userRepository.saveAndFlush(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        userService.requestRegistration(request);

        ArgumentCaptor<User> savedUser = ArgumentCaptor.forClass(User.class);
        verify(userRepository).saveAndFlush(savedUser.capture());
        assertEquals(UserRole.PATIENT, savedUser.getValue().getRole());
    }

    @Test
    void shouldResendVerificationWithoutRevealingExistingUnverifiedEmail() {
        CreateUserRequest request = new CreateUserRequest(
                "Vinicius",
                "vinicius@example.com",
                "12345678"
        );

        User existingUser = new User(
                "Vinicius", "vinicius@example.com", "encoded-password", UserRole.PATIENT
        );
        when(userRepository.findByEmailIgnoreCase("vinicius@example.com"))
                .thenReturn(java.util.Optional.of(existingUser));

        userService.requestRegistration(request);

        verify(emailVerificationService).sendFor(existingUser);
        verify(userRepository, never()).saveAndFlush(any(User.class));
        verify(passwordEncoder, never()).encode(anyString());
    }

    @Test
    void shouldNotSendEmailWhenExistingEmailIsAlreadyVerified() {
        CreateUserRequest request = new CreateUserRequest(
                "Vinicius",
                "vinicius@example.com",
                "12345678"
        );
        User existingUser = new User(
                "Vinicius", "vinicius@example.com", "encoded-password", UserRole.PATIENT
        );
        existingUser.setEmailVerified(true);
        existingUser.setActive(true);

        when(userRepository.findByEmailIgnoreCase("vinicius@example.com"))
                .thenReturn(java.util.Optional.of(existingUser));

        userService.requestRegistration(request);

        verify(userRepository, never()).saveAndFlush(any(User.class));
        verifyNoInteractions(emailVerificationService);
        verify(passwordEncoder, never()).encode(anyString());
    }

}
