package com.nautica.dto;

import lombok.Data;

@Data
public class AuthResponse {
	private String token;//Contains JWT Tokens
	private String username;
	private String email;
	private String message;
    private Boolean isAdmin;
	
	public AuthResponse(String token, String username,String email, String message, Boolean isAdmin) {
        this.token = token;
        this.username = username;
        this.email=email;
        this.message = message;
        this.isAdmin = isAdmin;
    }

}
