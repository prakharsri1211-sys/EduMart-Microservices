package com.edumart.authservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.edumart.authservice.repository")
@EntityScan(basePackages = "com.edumart.authservice.model")

public class EduMartAuthServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(EduMartAuthServiceApplication.class, args);
	}
}