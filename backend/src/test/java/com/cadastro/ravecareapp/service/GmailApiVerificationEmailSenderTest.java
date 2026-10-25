package com.cadastro.ravecareapp.service;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.header;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

class GmailApiVerificationEmailSenderTest {

    @Test
    void refreshesOAuthTokenAndSendsEncodedEmailThroughGmailApi() throws Exception {
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        server.expect(requestTo("https://oauth.example/token"))
                .andExpect(method(HttpMethod.POST))
                .andExpect(content().contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(content().string(org.hamcrest.Matchers.containsString("grant_type=refresh_token")))
                .andRespond(withSuccess("""
                        {"access_token":"test-access-token","expires_in":3600}
                        """, MediaType.APPLICATION_JSON));
        server.expect(requestTo("https://gmail.example/send"))
                .andExpect(method(HttpMethod.POST))
                .andExpect(header("Authorization", "Bearer test-access-token"))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().string(org.hamcrest.Matchers.containsString("\"raw\"")))
                .andRespond(withSuccess("{}", MediaType.APPLICATION_JSON));

        GmailApiVerificationEmailSender sender = new GmailApiVerificationEmailSender(
                builder,
                "client-id",
                "client-secret",
                "refresh-token",
                "ravecare@example.com",
                "https://oauth.example/token",
                "https://gmail.example/send"
        );

        sender.send("patient@example.com", "Confirmação", "payload");

        server.verify();
    }

    @Test
    void rejectsHeaderInjectionBeforeMakingNetworkRequests() {
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        GmailApiVerificationEmailSender sender = new GmailApiVerificationEmailSender(
                builder,
                "client-id",
                "client-secret",
                "refresh-token",
                "ravecare@example.com",
                "https://oauth.example/token",
                "https://gmail.example/send"
        );

        assertThrows(IllegalArgumentException.class,
                () -> sender.send("patient@example.com\r\nBcc: attacker@example.com", "Subject", "Body"));

        server.verify();
    }
}
