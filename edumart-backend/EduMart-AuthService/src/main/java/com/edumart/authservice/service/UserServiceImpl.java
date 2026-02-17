package com.edumart.authservice.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.edumart.authservice.model.User;
import com.edumart.authservice.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder; // Injected from SecurityConfig

	@Override
	public User registerUser(User user) {
		// HASH the password before saving!
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		// Default role for new users
		if (user.getRole() == null || user.getRole().isEmpty()) {
			user.setRole("STUDENT");
		}

		return userRepository.save(user);
	}

	@Override
	public User authenticate(String username, String rawPassword) {
		Optional<User> userOptional = userRepository.findByUsername(username);

		if (userOptional.isPresent()) {
			User user = userOptional.get();
			// Compare the raw input password with the stored HASHED password
			if (passwordEncoder.matches(rawPassword, user.getPassword())) {
				return user; // Authentication successful
			}
		}
		return null; // Authentication failed
	}
}