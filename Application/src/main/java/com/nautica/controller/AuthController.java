package com.nautica.controller;

import com.nautica.dto.*;
import com.nautica.service.AuthService;
import com.nautica.service.PasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    private final PasswordService passwordService;
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @RequestParam String email) {

        passwordService.forgotPassword(email);

        return ResponseEntity.ok(
                "If the account exists, an email will be sent."
        );
    }
}
