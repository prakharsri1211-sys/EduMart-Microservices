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
	 * LOGIN: Validates credentials and returns a JWT.
	 */
	public String login(String username, String password) {
		// 1. Fetch user or throw error (Triggers the 500 error you saw if user doesn't
		// exist)
		User user = repository.findByUsername(username)
				.orElseThrow(() -> new RuntimeException("Invalid username or password"));

		// 2. BCrypt Verification
		// Matches the plain text 'password' against the stored hash
		if (!passwordEncoder.matches(password, user.getPassword())) {
			throw new RuntimeException("Invalid username or password");
		}

		// 3. Generate Token
		// Ensure your JwtUtil uses 'user.getUsername()' as the Subject
		return jwtUtil.generateToken(user.getUsername(), user.getRole());
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