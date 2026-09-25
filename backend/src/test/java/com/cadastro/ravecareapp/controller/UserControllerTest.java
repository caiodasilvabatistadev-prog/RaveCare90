package com.cadastro.ravecareapp.controller;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import com.cadastro.ravecareapp.dto.request.CreateUserRequest;
import com.cadastro.ravecareapp.dto.response.UserResponse;
import com.cadastro.ravecareapp.enums.UserRole;
import com.cadastro.ravecareapp.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)

class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    @Test
    void shouldCreateUser() throws Exception {
        UUID id = UUID.randomUUID();

        CreateUserRequest request = new CreateUserRequest(
                "Vinicius",
                "vinicius@example.com",
                "12345678"
        );

        UserResponse response = new UserResponse(
                id,
                "Vinicius",
                "vinicius@example.com",
                UserRole.PATIENT,
                true,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(userService.create(any(CreateUserRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.name").value("Vinicius"))
                .andExpect(jsonPath("$.email").value("vinicius@example.com"))
                .andExpect(jsonPath("$.role").value("PATIENT"))
                .andExpect(jsonPath("$.active").value(true))
                .andExpect(jsonPath("$.password").doesNotExist());
    }

    @Test
    void shouldFindUserById() throws Exception {
        UUID id = UUID.randomUUID();

        UserResponse response = new UserResponse(
                id,
                "Vinicius",
                "vinicius@example.com",
                UserRole.PATIENT,
                true,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(userService.findById(id)).thenReturn(response);

        mockMvc.perform(get("/api/v1/users/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.email").value("vinicius@example.com"));
    }

    @Test
    void shouldFindAllUsers() throws Exception {
        UserResponse response = new UserResponse(
                UUID.randomUUID(),
                "Vinicius",
                "vinicius@example.com",
                UserRole.PATIENT,
                true,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(userService.findAll()).thenReturn(List.of(response));

        mockMvc.perform(get("/api/v1/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Vinicius"))
                .andExpect(jsonPath("$[0].email").value("vinicius@example.com"));
    }

    @Test
    void shouldRejectInvalidUser() throws Exception {
        String invalidRequest = """
                {
                    "name": "",
                    "email": "invalid-email",
                    "password": "123"
                }
                """;

        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidRequest))
                .andExpect(status().isBadRequest());
    }
}
