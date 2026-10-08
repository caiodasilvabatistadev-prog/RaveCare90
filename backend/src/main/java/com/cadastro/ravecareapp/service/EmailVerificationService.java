package com.cadastro.ravecareapp.service;

import com.cadastro.ravecareapp.entity.EmailVerificationToken;
import com.cadastro.ravecareapp.entity.User;
import com.cadastro.ravecareapp.exception.BusinessException;
import com.cadastro.ravecareapp.repository.EmailVerificationTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
public class EmailVerificationService {

    private static final SecureRandom RANDOM = new SecureRandom();

    private final EmailVerificationTokenRepository tokens;
    private final JavaMailSender mailSender;
    private final String publicUrl;

    public EmailVerificationService(
            EmailVerificationTokenRepository tokens,
            JavaMailSender mailSender,
            @Value("${app.public-url}") String publicUrl
    ) {
        this.tokens = tokens;
        this.mailSender = mailSender;
        this.publicUrl = publicUrl;
    }

    @Transactional
    public void sendFor(User user) {
        String rawToken = generateToken();
        tokens.save(new EmailVerificationToken(
                user,
                hash(rawToken),
                LocalDateTime.now().plusHours(24)
        ));

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Confirme seu e-mail - RaveCare");
        message.setText("Confirme sua conta: " + publicUrl
                + "/confirmar-email?token=" + rawToken);
        mailSender.send(message);
    }

    @Transactional
    public void verify(String rawToken) {
        EmailVerificationToken token = tokens.findByTokenHash(hash(rawToken))
                .orElseThrow(() -> new BusinessException("Invalid verification token"));

        if (!token.isUsable(LocalDateTime.now())) {
            throw new BusinessException("Invalid verification token");
        }

        User user = token.getUser();
        user.setEmailVerified(true);
        user.setActive(true);
        token.markUsed();
    }

    private String generateToken() {
        byte[] bytes = new byte[32];
        RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String hash(String value) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256")
                    .digest(value.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(digest);
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 is unavailable", exception);
        }
    }
}
