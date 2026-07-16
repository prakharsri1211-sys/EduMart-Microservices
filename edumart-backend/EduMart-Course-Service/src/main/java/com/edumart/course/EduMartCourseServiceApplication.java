package com.edumart.course;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class EduMartCourseServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EduMartCourseServiceApplication.class, args);
	}
}
