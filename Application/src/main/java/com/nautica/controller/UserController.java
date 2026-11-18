package com.nautica.controller;

import com.nautica.dto.ApiResponse;
import com.nautica.dto.CreateUserRequest;
import com.nautica.dto.UserResponse;
import com.nautica.model.User;
import com.nautica.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(new ApiResponse(true, "File deleted successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@RequestBody User userToUpdate, @PathVariable Long id) {
        UserResponse response = userService.updateUser(userToUpdate, id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        UserResponse response = userService.getUserResponseById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> createUser(@RequestBody CreateUserRequest userToCreate) {
        UserResponse response = userService.createUser(userToCreate);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/current-user")
    public ResponseEntity<UserResponse> updateCurrentUser(@RequestBody User userToUpdate) {
        UserResponse response = userService.updateCurrentUser(userToUpdate);
        return ResponseEntity.ok(response);
    }
}
