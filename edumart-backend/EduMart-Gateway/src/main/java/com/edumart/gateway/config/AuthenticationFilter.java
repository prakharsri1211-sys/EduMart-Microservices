package com.edumart.gateway.config;

import com.edumart.gateway.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.function.Predicate;

@Component
public class AuthenticationFilter implements GlobalFilter, Ordered {

    @Autowired
    private JwtUtil jwtUtil;

    // Endpoints that bypass authentication
    private final List<String> openApiEndpoints = List.of(
            "/api/auth/register",
            "/api/auth/login",
            "/api/auth/refresh"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();

        Predicate<ServerHttpRequest> isApiSecured = r -> openApiEndpoints.stream()
                .noneMatch(uri -> r.getURI().getPath().contains(uri));

        if (isApiSecured.test(request)) {
            HttpCookie authCookie = request.getCookies().getFirst("accessToken");

            if (authCookie == null || authCookie.getValue().isEmpty()) {
                return this.onError(exchange, "Authorization cookie is missing", HttpStatus.UNAUTHORIZED);
            }

            String token = authCookie.getValue();

            try {
                // Validate token
                jwtUtil.validateToken(token);
                
                // Extract claims
                String username = jwtUtil.extractUsername(token);
                String role = jwtUtil.extractRole(token);

                // Inject headers for downstream services
                request = exchange.getRequest()
                        .mutate()
                        .header("X-User-Id", username)
                        .header("X-User-Role", role)
                        .build();

            } catch (Exception e) {
                return this.onError(exchange, "Invalid Authorization token", HttpStatus.UNAUTHORIZED);
            }
        }

        return chain.filter(exchange.mutate().request(request).build());
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);
        return response.setComplete();
    }

    @Override
    public int getOrder() {
        return -1; // Execute before routing
    }
}
