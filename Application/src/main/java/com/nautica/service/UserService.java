package com.nautica.service;

import com.nautica.dto.CreateUserRequest;
import com.nautica.dto.UserResponse;
import com.nautica.model.FileEntity;
import com.nautica.model.User;
import com.nautica.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserResponse> getAllUsers() {
        List<User> allUsers = userRepository.findAll();
        return allUsers.stream().map(this::mapUserToUserResponse).toList();
    }

    private UserResponse mapUserToUserResponse(User user) {
        return new UserResponse(user.getId(), user.getFirstname(), user.getLastname(), user.getAddress(), user.getUsername(), user.getEmail(), user.getIsAdmin());
    }

    public void deleteUser(Long userId) {
        User userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(userEntity);
    }

    public UserResponse createUser(CreateUserRequest userToCreate) {
        if (userRepository.existsByUsername(userToCreate.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(userToCreate.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        // This creates new user
        String encodedPassword = passwordEncoder.encode(userToCreate.getPassword());
        User userToSave = new User(userToCreate.getUsername(), userToCreate.getEmail(), encodedPassword, userToCreate.getIsAdmin(),
                userToCreate.getFirstname(), userToCreate.getLastname(), userToCreate.getAddress(), LocalDateTime.now());

        return mapUserToUserResponse(userRepository.save(userToSave));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User does not exist"));
    }

    public UserResponse getUserResponseById(Long id) {
        return mapUserToUserResponse(userRepository.save(getUserById(id)));
    }

    public UserResponse updateUser(User userToUpdate, Long id) {
        User foundUser = getUserById(id);
        userToUpdate.setId(id);
        if (userRepository.existsByUsernameExcludeId(userToUpdate.getUsername(), id).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmailExcludeId(userToUpdate.getEmail(), id).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // This updates user
        LocalDateTime createdAt = foundUser.getCreatedAt();
        userToUpdate.setCreatedAt(createdAt);

        String encodedPassword = userToUpdate.getPassword().isBlank()
                ? foundUser.getPassword()
                : passwordEncoder.encode(userToUpdate.getPassword());

        userToUpdate.setPassword(encodedPassword);

        return mapUserToUserResponse(userRepository.save(userToUpdate));
    }

    public UserResponse updateCurrentUser(User userToUpdate) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        assert authentication != null;
        String username = authentication.getName();
        User loggedUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Long loggedUserId = loggedUser.getId();

        return updateUser(userToUpdate, loggedUserId);
    }
}
