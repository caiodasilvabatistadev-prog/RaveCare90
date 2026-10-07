package com.cadastro.ravecareapp.controller;

import com.cadastro.ravecareapp.dto.request.CreateUserRequest;
import com.cadastro.ravecareapp.dto.response.UserResponse;
import com.cadastro.ravecareapp.exception.RegistrationClosedException;
import com.cadastro.ravecareapp.service.UserService;
import com.cadastro.ravecareapp.service.RegistrationRateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final RegistrationRateLimiter registrationRateLimiter;
    private final boolean registrationEnabled;

    public UserController(
            UserService userService,
            RegistrationRateLimiter registrationRateLimiter,
            @Value("${app.registration.enabled:true}") boolean registrationEnabled
    ) {
        this.userService = userService;
        this.registrationRateLimiter = registrationRateLimiter;
        this.registrationEnabled = registrationEnabled;
    }

    @PostMapping
    public ResponseEntity<UserResponse> create(
            @Valid @RequestBody CreateUserRequest request,
            HttpServletRequest servletRequest
    ) {
        if (!registrationEnabled) {
            throw new RegistrationClosedException();
        }

        registrationRateLimiter.check(servletRequest.getRemoteAddr());
        UserResponse response = userService.create(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}
