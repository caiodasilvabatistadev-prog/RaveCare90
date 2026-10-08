package com.cadastro.ravecareapp.config;

import com.cadastro.ravecareapp.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {
    private final String secret;
    private static final long EXPIRATION_SECONDS = 3600;
    public JwtService(@Value("${JWT_SECRET:}") String secret) { this.secret = secret; }
    public String issue(User user) {
        Instant now = Instant.now();
        return Jwts.builder().subject(user.getId().toString()).claim("role", user.getRole().name())
                .issuedAt(Date.from(now)).expiration(Date.from(now.plusSeconds(EXPIRATION_SECONDS))).signWith(key()).compact();
    }
    public Claims parse(String token) { return Jwts.parser().verifyWith(key()).build().parseSignedClaims(token).getPayload(); }
    public long expiresIn() { return EXPIRATION_SECONDS; }
    private SecretKey key() {
        if (secret.length() < 32) throw new IllegalStateException("JWT_SECRET is not configured securely");
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
