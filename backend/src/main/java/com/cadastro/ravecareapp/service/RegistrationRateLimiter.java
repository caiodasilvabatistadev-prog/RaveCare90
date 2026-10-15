package com.cadastro.ravecareapp.service;

import com.cadastro.ravecareapp.exception.RateLimitExceededException;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RegistrationRateLimiter {

    private static final int MAX_ATTEMPTS = 5;
    private static final Duration WINDOW = Duration.ofMinutes(15);

    private final ConcurrentHashMap<String, Deque<Instant>> attempts = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Instant> blockedUntil = new ConcurrentHashMap<>();
    private final Clock clock;

    public RegistrationRateLimiter() {
        this(Clock.systemUTC());
    }

    RegistrationRateLimiter(Clock clock) {
        this.clock = clock;
    }

    public void check(String scope, String clientAddress) {
        String key = scope + ":" + clientAddress;
        Deque<Instant> clientAttempts = attempts.computeIfAbsent(
                key,
                ignored -> new ArrayDeque<>()
        );

        synchronized (clientAttempts) {
            Instant now = Instant.now(clock);
            Instant lockExpiration = blockedUntil.get(key);

            if (lockExpiration != null) {
                if (now.isBefore(lockExpiration)) {
                    throw new RateLimitExceededException();
                }

                blockedUntil.remove(key);
                clientAttempts.clear();
            }

            Instant threshold = now.minus(WINDOW);
            while (!clientAttempts.isEmpty()
                    && !clientAttempts.peekFirst().isAfter(threshold)) {
                clientAttempts.removeFirst();
            }

            if (clientAttempts.size() >= MAX_ATTEMPTS) {
                blockedUntil.put(key, now.plus(WINDOW));
                throw new RateLimitExceededException();
            }

            clientAttempts.addLast(now);
        }
    }

    public void check(String clientAddress) {
        check("registration", clientAddress);
    }
}
