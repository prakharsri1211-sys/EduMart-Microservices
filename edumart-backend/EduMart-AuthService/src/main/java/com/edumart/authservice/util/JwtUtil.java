package com.edumart.authservice.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expiration}")
	private long expirationTime;

	// ===================== SIGNING KEY =====================

	private SecretKey getSignKey() {

		byte[] keyBytes = Decoders.BASE64.decode(secret);

		return Keys.hmacShaKeyFor(keyBytes);
	}

	// ===================== TOKEN GENERATION =====================

	public String generateToken(String username, String role) {

		Map<String, Object> claims = new HashMap<>();

		claims.put("role", role);

		return Jwts.builder().claims(claims).subject(username).issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + expirationTime)).signWith(getSignKey()).compact();
	}

	// ===================== VALIDATION =====================

	public void validateToken(String token) {

		Jwts.parser().verifyWith(getSignKey()).build().parseSignedClaims(token);
	}

	// ===================== EXTRACTION =====================

	public String extractUsername(String token) {

		Claims claims = Jwts.parser().verifyWith(getSignKey()).build().parseSignedClaims(token).getPayload();

		return claims.getSubject();
	}

	public String extractRole(String token) {

		Claims claims = Jwts.parser().verifyWith(getSignKey()).build().parseSignedClaims(token).getPayload();

		return claims.get("role", String.class);
	}
}
