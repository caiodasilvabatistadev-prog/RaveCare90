package com.cadastro.ravecareapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(prefix = "app.mail", name = "provider", havingValue = "smtp", matchIfMissing = true)
public class SmtpVerificationEmailSender implements VerificationEmailSender {

    private final JavaMailSender mailSender;
    private final String from;

    public SmtpVerificationEmailSender(
            JavaMailSender mailSender,
            @Value("${app.mail.from:}") String from
    ) {
        this.mailSender = mailSender;
        this.from = from;
    }

    @Override
    public void send(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        if (!from.isBlank()) {
            message.setFrom(from);
        }
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
