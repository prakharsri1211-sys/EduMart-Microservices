package com.edumart.discoveryserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer

public class EduMartDiscoveryServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(EduMartDiscoveryServerApplication.class, args);
	}
}