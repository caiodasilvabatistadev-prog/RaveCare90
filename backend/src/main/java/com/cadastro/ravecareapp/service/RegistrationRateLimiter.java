package com.cadastro.ravecareapp.service;

import com.cadastro.ravecareapp.exception.RateLimitExceededException;
import org.springframework.stereotype.Service;

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

    public void check(String clientAddress) {
        Deque<Instant> clientAttempts = attempts.computeIfAbsent(
                clientAddress,
                ignored -> new ArrayDeque<>()
        );

        synchronized (clientAttempts) {
            Instant threshold = Instant.now().minus(WINDOW);
            while (!clientAttempts.isEmpty()
                    && clientAttempts.peekFirst().isBefore(threshold)) {
                clientAttempts.removeFirst();
            }

            if (clientAttempts.size() >= MAX_ATTEMPTS) {
                throw new RateLimitExceededException();
            }

            clientAttempts.addLast(Instant.now());
        }
    }
}
