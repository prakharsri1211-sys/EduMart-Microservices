package com.edumart.authservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.edumart.authservice.model.User;
import com.edumart.authservice.repository.UserRepository;
import com.edumart.authservice.util.JwtUtil;

@Service
public class AuthService {

	@Autowired
	private UserRepository repository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtUtil jwtUtil;

	/**
	 * REGISTER: Hashes password before saving to XAMPP/MySQL.
	 */
	public String registerUser(User user) {
		if (repository.findByUsername(user.getUsername()).isPresent()) {
			throw new RuntimeException("Username already exists");
		}

		// Always encode before saving to database
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		repository.save(user);

		return "User registered successfully";
	}

	/**
	 * LOGIN: Validates credentials and returns tokens and user info.
	 */
	public java.util.Map<String, String> login(String username, String password) {
		User user = repository.findByUsername(username)
				.orElseThrow(() -> new RuntimeException("Invalid username or password"));

		if (!passwordEncoder.matches(password, user.getPassword())) {
			throw new RuntimeException("Invalid username or password");
		}

		String accessToken = jwtUtil.generateAccessToken(user.getUsername(), user.getRole());
		String refreshToken = jwtUtil.generateRefreshToken(user.getUsername());
		
		java.util.Map<String, String> response = new java.util.HashMap<>();
		response.put("accessToken", accessToken);
		response.put("refreshToken", refreshToken);
		response.put("username", user.getUsername());
		response.put("role", user.getRole());
		
		return response;
	}

	/**
	 * REFRESH: Validates refresh token and returns a new access token map.
	 */
	public java.util.Map<String, String> refresh(String refreshToken) {
		try {
			jwtUtil.validateToken(refreshToken);
			String username = jwtUtil.extractUsername(refreshToken);
			
			User user = repository.findByUsername(username)
					.orElseThrow(() -> new RuntimeException("User not found"));
					
			String newAccessToken = jwtUtil.generateAccessToken(user.getUsername(), user.getRole());
			
			java.util.Map<String, String> response = new java.util.HashMap<>();
			response.put("accessToken", newAccessToken);
			response.put("username", user.getUsername());
			response.put("role", user.getRole());
			
			return response;
		} catch (Exception e) {
			throw new RuntimeException("Invalid refresh token");
		}
	}

	/**
	 * VALIDATE: Used by Gateway to check if a token is still good.
	 */
	public String validateToken(String token) {
		try {
			jwtUtil.validateToken(token);
			return jwtUtil.extractRole(token);
		} catch (Exception e) {
			throw new RuntimeException("Token validation failed: " + e.getMessage());
		}
	}
}