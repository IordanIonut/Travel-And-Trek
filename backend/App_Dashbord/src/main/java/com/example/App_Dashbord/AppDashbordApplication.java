package com.example.App_Dashbord;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EnableAsync
public class AppDashbordApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppDashbordApplication.class, args);
	}
	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}
}
