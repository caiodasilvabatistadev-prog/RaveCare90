package com.cadastro.ravecareapp.service;

import com.cadastro.ravecareapp.dto.request.CreateUserRequest;
import com.cadastro.ravecareapp.entity.User;
import com.cadastro.ravecareapp.enums.UserRole;
import com.cadastro.ravecareapp.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailVerificationService emailVerificationService;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            EmailVerificationService emailVerificationService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailVerificationService = emailVerificationService;
    }

    @Transactional
    public void requestRegistration(CreateUserRequest request) {

        String email = normalizeEmail(request.email());

        User existingUser = userRepository.findByEmailIgnoreCase(email)
                .orElse(null);

        if (existingUser != null) {
            if (!existingUser.isEmailVerified()) {
                emailVerificationService.sendFor(existingUser);
            }
            return;
        }

        User user = new User(
                request.name().trim(),
                email,
                passwordEncoder.encode(request.password()),
                UserRole.PATIENT
        );

        User savedUser = userRepository.saveAndFlush(user);
        emailVerificationService.sendFor(savedUser);
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }

}
