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
		java.util.Map<String, String> loginData = authService.login(request.getUsername(), request.getPassword());

		org.springframework.http.ResponseCookie accessCookie = org.springframework.http.ResponseCookie.from("accessToken", loginData.get("accessToken"))
				.httpOnly(true).secure(true).path("/").maxAge(15 * 60).sameSite("None").build();
				
		org.springframework.http.ResponseCookie refreshCookie = org.springframework.http.ResponseCookie.from("refreshToken", loginData.get("refreshToken"))
				.httpOnly(true).secure(true).path("/api/auth/refresh").maxAge(7 * 24 * 60 * 60).sameSite("None").build();

		java.util.Map<String, String> body = new java.util.HashMap<>();
		body.put("username", loginData.get("username"));
		body.put("role", loginData.get("role"));

		return ResponseEntity.ok()
				.header(org.springframework.http.HttpHeaders.SET_COOKIE, accessCookie.toString())
				.header(org.springframework.http.HttpHeaders.SET_COOKIE, refreshCookie.toString())
				.body(body);
	}

	// Refresh Token
	@PostMapping("/refresh")
	public ResponseEntity<?> refresh(@org.springframework.web.bind.annotation.CookieValue(name = "refreshToken", required = false) String refreshToken) {
		if (refreshToken == null) {
			return ResponseEntity.status(401).body("Refresh token missing");
		}
		
		try {
			java.util.Map<String, String> refreshData = authService.refresh(refreshToken);
			
			org.springframework.http.ResponseCookie accessCookie = org.springframework.http.ResponseCookie.from("accessToken", refreshData.get("accessToken"))
					.httpOnly(true).secure(true).path("/").maxAge(15 * 60).sameSite("None").build();
					
			java.util.Map<String, String> body = new java.util.HashMap<>();
			body.put("username", refreshData.get("username"));
			body.put("role", refreshData.get("role"));
			
			return ResponseEntity.ok()
					.header(org.springframework.http.HttpHeaders.SET_COOKIE, accessCookie.toString())
					.body(body);
		} catch (Exception e) {
			return ResponseEntity.status(401).body("Invalid refresh token");
		}
	}

	// Logout
	@PostMapping("/logout")
	public ResponseEntity<?> logout() {
		org.springframework.http.ResponseCookie accessCookie = org.springframework.http.ResponseCookie.from("accessToken", "")
				.httpOnly(true).secure(true).path("/").maxAge(0).sameSite("None").build();
				
		org.springframework.http.ResponseCookie refreshCookie = org.springframework.http.ResponseCookie.from("refreshToken", "")
				.httpOnly(true).secure(true).path("/api/auth/refresh").maxAge(0).sameSite("None").build();
				
		return ResponseEntity.ok()
				.header(org.springframework.http.HttpHeaders.SET_COOKIE, accessCookie.toString())
				.header(org.springframework.http.HttpHeaders.SET_COOKIE, refreshCookie.toString())
				.body("Logged out successfully");
	}

	// Validate
	@GetMapping("/validate")
	public ResponseEntity<String> validate(@RequestParam String token) {

		String role = authService.validateToken(token);

		return ResponseEntity.ok(role);
	}
}
