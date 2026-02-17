package com.edumart.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
public class EduMartGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(EduMartGatewayApplication.class, args);
	}

	/**
	 * @LoadBalanced is key here. It tells Spring to use Eureka to resolve the
	 *               service name (like AUTH-SERVICE) to a real IP/Port.
	 */
	@Bean
	@LoadBalanced
	public RestTemplate template() {
		return new RestTemplate();
	}
}