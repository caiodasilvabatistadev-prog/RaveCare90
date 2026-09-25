package com.cadastro.ravecareapp.service;

import com.cadastro.ravecareapp.dto.request.CreateUserRequest;
import com.cadastro.ravecareapp.dto.response.UserResponse;
import com.cadastro.ravecareapp.entity.User;
import com.cadastro.ravecareapp.enums.UserRole;
import com.cadastro.ravecareapp.exception.BusinessException;
import com.cadastro.ravecareapp.exception.ResourceNotFoundException;
import com.cadastro.ravecareapp.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private UUID userId;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
    }

    @Test
    void shouldCreateUser() {
        CreateUserRequest request = new CreateUserRequest(
                "Vinicius",
                "VINICIUS@EXAMPLE.COM",
                "12345678"
        );

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
        assertTrue(response.active());

        verify(passwordEncoder).encode("12345678");
        verify(userRepository).save(any(User.class));
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

    @Test
    void shouldFindUserById() {
        User user = new User(
                "Vinicius",
                "vinicius@example.com",
                "encoded-password",
                UserRole.PATIENT
        );

        when(userRepository.findById(userId))
                .thenReturn(Optional.of(user));

        UserResponse response = userService.findById(userId);

        assertNotNull(response);
        assertEquals("Vinicius", response.name());
        assertEquals("vinicius@example.com", response.email());
        assertEquals(UserRole.PATIENT, response.role());

        verify(userRepository).findById(userId);
    }

    @Test
    void shouldThrowExceptionWhenUserDoesNotExist() {
        when(userRepository.findById(userId))
                .thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(
                ResourceNotFoundException.class,
                () -> userService.findById(userId)
        );

        assertEquals("User not found", exception.getMessage());
    }
    @Test
    void shouldFindAllUsers() {
        User firstUser = new User(
                "Vinicius",
                "vinicius@example.com",
                "encoded-password",
                UserRole.PATIENT
        );

        User secondUser = new User(
                "Bianca",
                "bianca@example.com",
                "encoded-password",
                UserRole.DOCTOR
        );

        when(userRepository.findAll())
                .thenReturn(List.of(firstUser, secondUser));

        List<UserResponse> response = userService.findAll();

        assertNotNull(response);
        assertEquals(2, response.size());

        assertEquals("Vinicius", response.get(0).name());
        assertEquals("vinicius@example.com", response.get(0).email());
        assertEquals(UserRole.PATIENT, response.get(0).role());

        assertEquals("Bianca", response.get(1).name());
        assertEquals("bianca@example.com", response.get(1).email());
        assertEquals(UserRole.DOCTOR, response.get(1).role());

        verify(userRepository).findAll();
    }
}
