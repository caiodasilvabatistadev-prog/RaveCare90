package com.cadastro.ravecareapp.controller;

import com.cadastro.ravecareapp.config.JwtService;
import com.cadastro.ravecareapp.service.RegistrationRateLimiter;
import com.cadastro.ravecareapp.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.verifyNoInteractions;

@WebMvcTest(value = UserController.class, properties = "app.registration.enabled=false")
@AutoConfigureMockMvc(addFilters = false)
class RegistrationClosedControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private RegistrationRateLimiter registrationRateLimiter;

    @MockitoBean
    private JwtService jwtService;

    @Test
    void shouldRejectNewRegistrationsWhenTheyAreDisabled() throws Exception {
        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"Pessoa de teste","email":"teste@example.com","password":"senha-segura"}
                                """))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.error").value("Cadastro indisponível no momento."));

        verifyNoInteractions(userService, registrationRateLimiter);
    }
}
