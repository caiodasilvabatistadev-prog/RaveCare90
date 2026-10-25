package com.cadastro.ravecareapp.service;

import org.junit.jupiter.api.Test;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class SmtpVerificationEmailSenderTest {

    @Test
    void sendsMessageWithConfiguredFromAddress() {
        JavaMailSender mailSender = mock(JavaMailSender.class);
        SmtpVerificationEmailSender sender = new SmtpVerificationEmailSender(mailSender, "RaveCare <no-reply@example.com>");

        sender.send("patient@example.com", "Subject", "Body");

        org.mockito.ArgumentCaptor<SimpleMailMessage> message = org.mockito.ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mailSender).send(message.capture());
        org.junit.jupiter.api.Assertions.assertEquals("RaveCare <no-reply@example.com>", message.getValue().getFrom());
        org.junit.jupiter.api.Assertions.assertEquals("patient@example.com", message.getValue().getTo()[0]);
    }

    @Test
    void omitsFromAddressWhenNotConfigured() {
        JavaMailSender mailSender = mock(JavaMailSender.class);
        SmtpVerificationEmailSender sender = new SmtpVerificationEmailSender(mailSender, "");

        sender.send("patient@example.com", "Subject", "Body");

        verify(mailSender).send(any(SimpleMailMessage.class));
    }
}
