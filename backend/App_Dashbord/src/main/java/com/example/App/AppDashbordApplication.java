package com.example.App;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@SpringBootApplication
@RestController
@EnableCaching
public class AppDashbordApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppDashbordApplication.class, args);
	}
	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}

	public String generateId() {
		return String.valueOf(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE);
	}

}
