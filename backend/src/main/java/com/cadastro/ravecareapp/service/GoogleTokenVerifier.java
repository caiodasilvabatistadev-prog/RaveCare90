package com.cadastro.ravecareapp.service;

import com.cadastro.ravecareapp.exception.BusinessException;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class GoogleTokenVerifier {

    private final GoogleIdTokenVerifier verifier;

    public GoogleTokenVerifier(
            @Value("${google.oauth.client-id}") String clientId
    ) {
        this.verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                GsonFactory.getDefaultInstance()
        )
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    public GoogleUser verify(String idToken) {
        try {
            GoogleIdToken token = verifier.verify(idToken);

            if (token == null) {
                throw new BusinessException("Invalid Google token");
            }

            GoogleIdToken.Payload payload = token.getPayload();

            if (!Boolean.TRUE.equals(payload.getEmailVerified())) {
                throw new BusinessException("Google email is not verified");
            }

            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String googleId = payload.getSubject();

            if (email == null || email.isBlank()) {
                throw new BusinessException("Google account has no email");
            }

            return new GoogleUser(
                    googleId,
                    email.trim().toLowerCase(),
                    name
            );

        } catch (GeneralSecurityException | IOException exception) {
            throw new BusinessException("Could not verify Google token");
        }
    }

    public record GoogleUser(
            String googleId,
            String email,
            String name
    ) {
    }
}