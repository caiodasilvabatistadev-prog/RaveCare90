package com.cadastro.ravecareapp.service;

import com.cadastro.ravecareapp.exception.RateLimitExceededException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

class RegistrationRateLimiterTest {

    @Test
    void shouldAllowFiveAttemptsAndRejectTheSixthFromTheSameAddress() {
        RegistrationRateLimiter rateLimiter = new RegistrationRateLimiter();

        for (int attempt = 0; attempt < 5; attempt++) {
            assertDoesNotThrow(() -> rateLimiter.check("203.0.113.10"));
        }

        assertThrows(
                RateLimitExceededException.class,
                () -> rateLimiter.check("203.0.113.10")
        );
    }

    @Test
    void shouldTrackDifferentAddressesIndependently() {
        RegistrationRateLimiter rateLimiter = new RegistrationRateLimiter();

        for (int attempt = 0; attempt < 5; attempt++) {
            rateLimiter.check("203.0.113.10");
        }

        assertDoesNotThrow(() -> rateLimiter.check("203.0.113.11"));
    }
}
