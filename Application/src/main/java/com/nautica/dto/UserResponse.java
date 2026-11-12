package com.nautica.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String firstname;
    private String lastname;
    private String address;
    private String username;
    private String email;
    private Boolean isAdmin;
}
