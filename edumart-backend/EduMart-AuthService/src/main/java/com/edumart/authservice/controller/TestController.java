package com.edumart.authservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edumart.authservice.model.User;
import com.edumart.authservice.repository.UserRepository;

@RestController
@RequestMapping("/api/test")
public class TestController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@GetMapping("/test")
	public String test() {
		return "Auth Service is reachable!";
	}

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody User user) {
		// 1. Encrypt the password
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		// 2. Set default role if missing
		if (user.getRole() == null) {
			user.setRole("ROLE_USER");
		}

		// 3. Save to MySQL
		userRepository.save(user);

		return ResponseEntity.ok("User '" + user.getUsername() + "' registered successfully!");
	}
}