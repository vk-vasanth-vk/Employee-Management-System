package com.project.employee_management_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.project.employee_management_backend.jpa")
@EnableMongoRepositories(basePackages = "com.project.employee_management_backend.mongo")
public class EmployeeManagementBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeManagementBackendApplication.class, args);
	}
}
