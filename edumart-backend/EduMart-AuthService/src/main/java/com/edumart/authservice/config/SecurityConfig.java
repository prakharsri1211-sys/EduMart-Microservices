package com.edumart.authservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
				// 1. Disable CSRF (standard for stateless REST APIs)
				.csrf(AbstractHttpConfigurer::disable)

				// 2. Disable CORS here (Gateway will handle CORS for the whole system)
				.cors(AbstractHttpConfigurer::disable)

				// 3. Force Stateless Session Management
				// This prevents Spring from creating JSESSIONID cookies
				.sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

				// 4. Disable Redirections (The fix for your error)
				// We disable formLogin and httpBasic to stop the 302 Redirect to /login
				.formLogin(AbstractHttpConfigurer::disable).httpBasic(AbstractHttpConfigurer::disable)

				// 5. Configure Request Permissions
            .authorizeHttpRequests(auth -> auth
						.requestMatchers("/api/auth/**", "/error", "/actuator/**").permitAll() // Added /error and /actuator/** for Render health checks
                .anyRequest().authenticated()
				).build();
    }

	@Bean
    public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}