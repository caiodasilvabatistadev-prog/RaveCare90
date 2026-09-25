package com.cadastro.ravecareapp.config;

import com.cadastro.ravecareapp.controller.UserController;
import com.cadastro.ravecareapp.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
@Import(SecurityConfig.class)
class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @Test
    void shouldDenyUserDirectoryWithoutAuthentication() throws Exception {
        mockMvc.perform(get("/api/v1/users"))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldAllowPublicLandingPageResources() throws Exception {
        mockMvc.perform(get("/index.html"))
                .andExpect(result -> {
                    int responseStatus = result.getResponse().getStatus();
                    if (responseStatus == 401 || responseStatus == 403) {
                        throw new AssertionError("Public landing page was blocked by security");
                    }
                });
    }
}
