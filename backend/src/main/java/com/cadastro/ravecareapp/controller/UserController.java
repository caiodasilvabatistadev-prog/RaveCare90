package com.cadastro.ravecareapp.controller;

import com.cadastro.ravecareapp.dto.request.CreateUserRequest;
import com.cadastro.ravecareapp.dto.response.UserResponse;
import com.cadastro.ravecareapp.service.UserService;
import com.cadastro.ravecareapp.service.RegistrationRateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final RegistrationRateLimiter registrationRateLimiter;

    public UserController(
            UserService userService,
            RegistrationRateLimiter registrationRateLimiter
    ) {
        this.userService = userService;
        this.registrationRateLimiter = registrationRateLimiter;
    }

    @PostMapping
    public ResponseEntity<UserResponse> create(
            @Valid @RequestBody CreateUserRequest request,
            HttpServletRequest servletRequest
    ) {
        registrationRateLimiter.check(servletRequest.getRemoteAddr());
        UserResponse response = userService.create(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}
