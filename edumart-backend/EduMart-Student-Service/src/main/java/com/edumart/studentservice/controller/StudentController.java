package com.edumart.studentservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student")
public class StudentController {

	@GetMapping("/msg")
	public String getMessage() {
		return "Welcome to EduMart! You have successfully passed through the API Gateway and Auth validation.";
	}

	@GetMapping("/details")
	public String getStudentDetails() {
		return "Student Name: Test User, ID: 101, Status: Active";
	}
}