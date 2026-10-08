package com.cadastro.ravecareapp.controller;

import com.cadastro.ravecareapp.config.JwtService;
import com.cadastro.ravecareapp.exception.RateLimitExceededException;
import com.cadastro.ravecareapp.service.AuthService;
import com.cadastro.ravecareapp.service.EmailVerificationService;
import com.cadastro.ravecareapp.service.RegistrationRateLimiter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AuthService authService;

    @MockitoBean
    private EmailVerificationService emailVerificationService;

    @MockitoBean
    private RegistrationRateLimiter rateLimiter;

    @MockitoBean
    private JwtService jwtService;

    @Test
    void shouldRateLimitPasswordLogin() throws Exception {
        doThrow(new RateLimitExceededException())
                .when(rateLimiter)
                .check("login", "127.0.0.1");

        mockMvc.perform(post("/api/v1/auth/login")
                        .with(request -> {
                            request.setRemoteAddr("127.0.0.1");
                            return request;
                        })
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"teste@example.com","password":"senha-segura"}
                                """))
                .andExpect(status().isTooManyRequests());

        verifyNoInteractions(authService);
    }

    @Test
    void shouldRateLimitEmailVerification() throws Exception {
        doThrow(new RateLimitExceededException())
                .when(rateLimiter)
                .check("email-verification", "127.0.0.1");

        mockMvc.perform(post("/api/v1/auth/verify-email")
                        .with(request -> {
                            request.setRemoteAddr("127.0.0.1");
                            return request;
                        })
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"token\":\"token-de-teste\"}"))
                .andExpect(status().isTooManyRequests());

        verifyNoInteractions(emailVerificationService);
    }
}
