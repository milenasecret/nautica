package com.nautica.service;

import com.nautica.dto.*;
import com.nautica.model.User;
import com.nautica.repository.UserRepository;
import com.nautica.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {
	private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        
        // Generate token
        String token = jwtUtil.generateToken(user.getUsername());
        
        return new AuthResponse(token, user.getUsername(),user.getEmail(), "Login successful", user.getIsAdmin());
    }

}
