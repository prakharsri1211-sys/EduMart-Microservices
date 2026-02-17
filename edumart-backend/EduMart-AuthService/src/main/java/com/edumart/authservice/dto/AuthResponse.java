package com.edumart.authservice.dto;

import lombok.Builder;
import lombok.Data;

@Data // Lombok annotation
@Builder
public class AuthResponse {
	private String token;
	private String username;
	private Long userId;
	private String role;
}