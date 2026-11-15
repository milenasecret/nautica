package com.nautica.service;

import com.nautica.model.PasswordResetToken;
import com.nautica.model.User;
import com.nautica.repository.PasswordResetTokenRepository;
import com.nautica.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordService {
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;

    public void forgotPassword(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Generate token
        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken =
                new PasswordResetToken();

        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(
                LocalDateTime.now().plusMinutes(15)
        );

        tokenRepository.save(resetToken);

        // Send email
        emailService.sendResetEmail(email, token);
    }
}
