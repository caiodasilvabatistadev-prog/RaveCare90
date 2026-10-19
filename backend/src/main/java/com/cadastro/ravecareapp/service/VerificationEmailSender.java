package com.cadastro.ravecareapp.service;

public interface VerificationEmailSender {

    void send(String to, String subject, String body);
}
