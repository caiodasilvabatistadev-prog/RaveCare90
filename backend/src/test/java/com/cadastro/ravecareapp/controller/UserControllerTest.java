package com.cadastro.ravecareapp.controller;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import com.cadastro.ravecareapp.dto.request.CreateUserRequest;
import com.cadastro.ravecareapp.config.JwtService;
import com.cadastro.ravecareapp.dto.response.UserResponse;
import com.cadastro.ravecareapp.enums.UserRole;
import com.cadastro.ravecareapp.service.UserService;
import com.cadastro.ravecareapp.service.RegistrationRateLimiter;
import com.cadastro.ravecareapp.exception.RateLimitExceededException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = UserController.class, properties = "app.registration.enabled=true")
@AutoConfigureMockMvc(addFilters = false)

class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private RegistrationRateLimiter registrationRateLimiter;

    @MockitoBean
    private JwtService jwtService;

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
                false,
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
                .andExpect(jsonPath("$.active").value(false))
                .andExpect(jsonPath("$.password").doesNotExist());
    }

    @Test
    void shouldNotExposeUserListingEndpoints() throws Exception {
        UUID id = UUID.randomUUID();

        mockMvc.perform(get("/api/v1/users/{id}", id))
                .andExpect(status().isNotFound());

        mockMvc.perform(get("/api/v1/users"))
                .andExpect(status().isMethodNotAllowed());
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

    @Test
    void shouldRejectTooManyRegistrationAttempts() throws Exception {
        CreateUserRequest request = new CreateUserRequest(
                "Vinicius", "vinicius@example.com", "12345678"
        );

        doThrow(new RateLimitExceededException())
                .when(registrationRateLimiter)
                .check("127.0.0.1");

        mockMvc.perform(post("/api/v1/users")
                        .with(servletRequest -> {
                            servletRequest.setRemoteAddr("127.0.0.1");
                            return servletRequest;
                        })
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isTooManyRequests());
    }
}
