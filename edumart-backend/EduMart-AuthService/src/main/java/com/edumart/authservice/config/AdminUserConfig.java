package com.edumart.authservice.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.edumart.authservice.model.User;
import com.edumart.authservice.repository.UserRepository;

@Configuration
public class AdminUserConfig {

	@Bean
	CommandLineRunner initAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			String adminUsername = "ultimate_admin";

			// Check if the admin already exists so we don't create duplicates
			if (userRepository.findByUsername(adminUsername).isEmpty()) {
				User admin = new User();
				admin.setUsername(adminUsername);
				admin.setPassword(passwordEncoder.encode("Admin@1234")); // Secure default password
				admin.setRole("ROLE_ADMIN"); // Ensure your entity supports Roles

				userRepository.save(admin);
				System.out.println(">>> Ultimate Admin user created successfully!");
			}
		};
	}
}