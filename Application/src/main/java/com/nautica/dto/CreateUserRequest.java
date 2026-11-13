package com.nautica.dto;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String username;
    private String firstname;
    private String lastname;
    private String address;
    private String email;
    private String password;
    private Boolean isAdmin;
}
