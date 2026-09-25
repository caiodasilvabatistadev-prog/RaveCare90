package com.cadastro.ravecareapp.entity;

import com.cadastro.ravecareapp.enums.UserRole;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void shouldCreateEmptyUserForJpa() {
        User user = new User();

        assertNull(user.getId());
        assertNull(user.getName());
    }

    @Test
    void shouldCreateUser() {
        User user = new User(
                "Vinicius",
                "vinicius@example.com",
                "password",
                UserRole.PATIENT
        );

        assertEquals("Vinicius", user.getName());
        assertEquals("vinicius@example.com", user.getEmail());
        assertEquals("password", user.getPassword());
        assertEquals(UserRole.PATIENT, user.getRole());
        assertTrue(user.isActive());
    }

    @Test
    void shouldUpdateUserFields() {
        User user = new User(
                "Vinicius",
                "vinicius@example.com",
                "password",
                UserRole.PATIENT
        );

        user.setName("Vinicius Mangueira");
        user.setEmail("new@example.com");
        user.setPassword("new-password");
        user.setRole(UserRole.DOCTOR);
        user.setActive(false);

        assertEquals("Vinicius Mangueira", user.getName());
        assertEquals("new@example.com", user.getEmail());
        assertEquals("new-password", user.getPassword());
        assertEquals(UserRole.DOCTOR, user.getRole());
        assertFalse(user.isActive());
    }

    @Test
    void shouldSetTimestampsOnCreate() {
        User user = new User(
                "Vinicius",
                "vinicius@example.com",
                "password",
                UserRole.PATIENT
        );

        assertNull(user.getCreatedAt());
        assertNull(user.getUpdatedAt());

        user.onCreate();

        assertNotNull(user.getCreatedAt());
        assertNotNull(user.getUpdatedAt());
        assertEquals(user.getCreatedAt(), user.getUpdatedAt());
    }

    @Test
    void shouldUpdateTimestampOnUpdate() {
        User user = new User(
                "Vinicius",
                "vinicius@example.com",
                "password",
                UserRole.PATIENT
        );

        user.onCreate();

        LocalDateTime previousUpdatedAt = user.getUpdatedAt();

        user.onUpdate();

        assertNotNull(user.getUpdatedAt());
        assertFalse(user.getUpdatedAt().isBefore(previousUpdatedAt));
    }
}
