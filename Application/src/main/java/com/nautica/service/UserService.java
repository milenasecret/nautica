package com.nautica.service;

import com.nautica.dto.UserResponse;
import com.nautica.model.User;
import com.nautica.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponse> getAllUsers() {
        List<User> allUsers = userRepository.findAll();
        return allUsers.stream().map(this::mapUserToUserResponse).toList();
    }

    private UserResponse mapUserToUserResponse(User user) {
        return new UserResponse(user.getId(), user.getFirstname(), user.getLastname(), user.getAddress(), user.getUsername(), user.getEmail(), user.getIsAdmin());
    }
}
