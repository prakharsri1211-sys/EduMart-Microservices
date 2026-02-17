package com.edumart.authservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edumart.authservice.dto.AuthRequest;
import com.edumart.authservice.model.User;
import com.edumart.authservice.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	// Register
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody User user) {
		return ResponseEntity.ok(authService.registerUser(user));
	}

	// Login
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthRequest request) {

		String token = authService.login(request.getUsername(), request.getPassword());

		return ResponseEntity.ok(token);
	}

	// Validate
	@GetMapping("/validate")
	public ResponseEntity<String> validate(@RequestParam String token) {

		String role = authService.validateToken(token);

		return ResponseEntity.ok(role);
	}
}
