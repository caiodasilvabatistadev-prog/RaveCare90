package com.cadastro.ravecareapp.service;

import com.cadastro.ravecareapp.exception.RateLimitExceededException;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

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

    @Test
    void shouldTrackDifferentScopesIndependentlyForSameAddress() {
        RegistrationRateLimiter rateLimiter = new RegistrationRateLimiter();
        String clientAddress = "203.0.113.10";
        String firstScope = "registration";
        String secondScope = "password-reset";

        for (int attempt = 0; attempt < 5; attempt++) {
            rateLimiter.check(firstScope, clientAddress);
        }

        assertDoesNotThrow(
                () -> rateLimiter.check(secondScope, clientAddress)
        );
    }

    @Test
    void shouldAllowAttemptsAfterWindowExpires() {
        Clock clock = mock(Clock.class);
        Instant start = Instant.parse("2026-10-14T12:00:00Z");
        when(clock.instant()).thenReturn(start);

        RegistrationRateLimiter rateLimiter = new RegistrationRateLimiter(clock);
        String scope = "registration";
        String clientAddress = "203.0.113.10";

        for (int attempt = 0; attempt < 5; attempt++) {
            rateLimiter.check(scope, clientAddress);
        }

        when(clock.instant()).thenReturn(start.plus(Duration.ofMinutes(16)));

        assertDoesNotThrow(
                () -> rateLimiter.check(scope, clientAddress)
        );
    }

    @Test
    void shouldAllowAttemptsWhenWindowExpiresExactlyAfter15Minutes() {
        Clock clock = mock(Clock.class);
        Instant start = Instant.parse("2026-10-14T12:00:00Z");
        when(clock.instant()).thenReturn(start);

        RegistrationRateLimiter rateLimiter = new RegistrationRateLimiter(clock);
        String scope = "registration";
        String clientAddress = "203.0.113.10";

        for (int attempt = 0; attempt < 5; attempt++) {
            rateLimiter.check(scope, clientAddress);
        }

        when(clock.instant()).thenReturn(start.plus(Duration.ofMinutes(15)));

        assertDoesNotThrow(
                () -> rateLimiter.check(scope, clientAddress)
        );
    }
}
