package com.cadastro.ravecareapp;

import com.cadastro.ravecareapp.repository.UserRepository;
import com.cadastro.ravecareapp.repository.AnamnesisRepository;
import com.cadastro.ravecareapp.repository.EmailVerificationTokenRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest(properties = {
        "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration,org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration,org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration",
        "google.oauth.client-id=test-client-id"
})
class RaveCareAppApplicationTests {

    @MockitoBean
    private UserRepository userRepository;

    @MockitoBean
    private AnamnesisRepository anamnesisRepository;

    @MockitoBean
    private EmailVerificationTokenRepository emailVerificationTokenRepository;

    @Test
    void contextLoads() {
    }

}
