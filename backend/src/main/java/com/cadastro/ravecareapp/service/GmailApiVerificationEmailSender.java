package com.cadastro.ravecareapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Component
@ConditionalOnProperty(prefix = "app.mail", name = "provider", havingValue = "gmail-api")
public class GmailApiVerificationEmailSender implements VerificationEmailSender {

    private final RestClient restClient;
    private final String clientId;
    private final String clientSecret;
    private final String refreshToken;
    private final String from;
    private final String tokenUrl;
    private final String sendUrl;

    public GmailApiVerificationEmailSender(
            RestClient.Builder restClientBuilder,
            @Value("${app.mail.gmail.client-id}") String clientId,
            @Value("${app.mail.gmail.client-secret}") String clientSecret,
            @Value("${app.mail.gmail.refresh-token}") String refreshToken,
            @Value("${app.mail.from}") String from,
            @Value("${app.mail.gmail.token-url:https://oauth2.googleapis.com/token}") String tokenUrl,
            @Value("${app.mail.gmail.send-url:https://gmail.googleapis.com/gmail/v1/users/me/messages/send}") String sendUrl
    ) {
        this.restClient = restClientBuilder.build();
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.refreshToken = refreshToken;
        this.from = from;
        this.tokenUrl = tokenUrl;
        this.sendUrl = sendUrl;
    }

    @Override
    public void send(String to, String subject, String body) {
        String rawMessage = encodeMessage(to, subject, body);
        String accessToken = refreshAccessToken();

        restClient.post()
                .uri(sendUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .headers(headers -> headers.setBearerAuth(accessToken))
                .body(Map.of("raw", rawMessage))
                .retrieve()
                .toBodilessEntity();
    }

    private String refreshAccessToken() {
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("client_id", clientId);
        form.add("client_secret", clientSecret);
        form.add("refresh_token", refreshToken);
        form.add("grant_type", "refresh_token");

        Map<?, ?> response = restClient.post()
                .uri(tokenUrl)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(form)
                .retrieve()
                .body(Map.class);

        if (response == null || !(response.get("access_token") instanceof String accessToken)
                || accessToken.isBlank()) {
            throw new IllegalStateException("Google did not return an access token");
        }
        return accessToken;
    }

    private String encodeMessage(String to, String subject, String body) {
        rejectHeaderInjection(from);
        rejectHeaderInjection(to);
        rejectHeaderInjection(subject);

        String encodedSubject = Base64.getEncoder()
                .encodeToString(subject.getBytes(StandardCharsets.UTF_8));
        String encodedBody = Base64.getEncoder()
                .encodeToString(body.getBytes(StandardCharsets.UTF_8));
        String message = "From: " + from + "\r\n"
                + "To: " + to + "\r\n"
                + "Subject: =?UTF-8?B?" + encodedSubject + "?=\r\n"
                + "MIME-Version: 1.0\r\n"
                + "Content-Type: text/plain; charset=UTF-8\r\n"
                + "Content-Transfer-Encoding: base64\r\n\r\n"
                + encodedBody;
        return Base64.getUrlEncoder().withoutPadding()
                .encodeToString(message.getBytes(StandardCharsets.UTF_8));
    }

    private void rejectHeaderInjection(String value) {
        if (value.contains("\r") || value.contains("\n")) {
            throw new IllegalArgumentException("Email headers cannot contain line breaks");
        }
    }
}
