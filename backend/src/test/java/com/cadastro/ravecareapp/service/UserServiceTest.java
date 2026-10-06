package com.cadastro.ravecareapp.service;

import com.cadastro.ravecareapp.dto.request.CreateUserRequest;
import com.cadastro.ravecareapp.dto.response.UserResponse;
import com.cadastro.ravecareapp.entity.User;
import com.cadastro.ravecareapp.enums.UserRole;
import com.cadastro.ravecareapp.exception.BusinessException;
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

        when(userRepository.existsByEmailIgnoreCase("vinicius@example.com"))
                .thenReturn(false);

        when(passwordEncoder.encode("12345678"))
                .thenReturn("encoded-password");

        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        UserResponse response = userService.create(request);

        assertNotNull(response);
        assertEquals("Vinicius", response.name());
        assertEquals("vinicius@example.com", response.email());
        assertEquals(UserRole.PATIENT, response.role());
        assertFalse(response.active());

        verify(passwordEncoder).encode("12345678");
        verify(userRepository).save(savedUser.capture());
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

        when(userRepository.existsByEmailIgnoreCase("vinicius@example.com"))
                .thenReturn(false);
        when(passwordEncoder.encode("12345678"))
                .thenReturn("encoded-password");
        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        UserResponse response = userService.create(request);

        assertEquals(UserRole.PATIENT, response.role());
    }

    @Test
    void shouldThrowExceptionWhenEmailAlreadyExists() {
        CreateUserRequest request = new CreateUserRequest(
                "Vinicius",
                "vinicius@example.com",
                "12345678"
        );

        when(userRepository.existsByEmailIgnoreCase("vinicius@example.com"))
                .thenReturn(true);

        BusinessException exception = assertThrows(
                BusinessException.class,
                () -> userService.create(request)
        );

        assertEquals("Email already registered", exception.getMessage());

        verify(userRepository, never()).save(any(User.class));
        verify(passwordEncoder, never()).encode(anyString());
    }

}
