package com.edumart.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {
	private String username;
	private String password;
	private String role; // Included for flexibility during registration/login flows
}