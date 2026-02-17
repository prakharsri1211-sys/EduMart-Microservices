package com.edumart.authservice.service;

import com.edumart.authservice.model.User;

public interface UserService {

	User registerUser(User user);

	// Authenticates a user and returns the full User object if successful
	User authenticate(String username, String rawPassword);
}