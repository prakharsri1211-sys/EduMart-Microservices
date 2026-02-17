package com.edumart.gateway.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

	@Autowired
	private RouteValidator validator;

	@Autowired
	private RestTemplate template;

	public AuthenticationFilter() {
		super(Config.class);
	}

	@Override
	public GatewayFilter apply(Config config) {
		return (exchange, chain) -> {
			// 1. Determine if the request path is secured
			if (validator.isSecured.test(exchange.getRequest())) {

				// 2. Check for Authorization header
				if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
					throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing Authorization Header");
				}

				String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
				if (authHeader != null && authHeader.startsWith("Bearer ")) {
					authHeader = authHeader.substring(7);
				}

				// Inside the try block of your Gateway filter
				try {
					// 1. Call Auth-Service and get the Role back
					String role = template.getForObject("http://AUTH-SERVICE/api/auth/validate?token=" + authHeader,
							String.class);

					// 2. Simple Role Check logic
					String path = exchange.getRequest().getURI().getPath();

					if (path.contains("/admin/") && !role.equals("ADMIN")) {
						throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Admin access required");
					}
				} catch (Exception e) {
					throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Access Denied");
				}
			}
			return chain.filter(exchange);
		};
	}

	public static class Config {
		// Inner class for configuration properties
	}
}