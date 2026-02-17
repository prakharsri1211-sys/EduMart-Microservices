package com.edumart.discoveryserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class EduMartAuthServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EduMartAuthServiceApplication.class, args);
	}

}
