package com.nautica.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public void sendResetEmail(String email, String token) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Password reset");

        message.setText(
                "Click the link to reset your password: " +
                        "http://localhost:4200/reset-password?token=" + token
        );

        mailSender.send(message);
    }
}
