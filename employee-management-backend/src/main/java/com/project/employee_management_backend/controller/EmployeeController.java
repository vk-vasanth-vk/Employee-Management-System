package com.project.employee_management_backend.controller;

import com.project.employee_management_backend.model.Employee;
import com.project.employee_management_backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.lang.Integer;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/")
    public String greetings() {
        return "Hello, from Employee Management Backend!";
    }

    @PostMapping("/insertRecord")
    public ResponseEntity<Map<String, String>> insertRecord(@RequestBody Employee employee) {
        try {
            // Insert employee data
            employeeService.insertEmployee(employee);

            // Return success message
            Map<String, String> successResponse = new HashMap<>();
            successResponse.put("message", "Employee added successfully!");
            return ResponseEntity.ok(successResponse);

        } catch (Exception e) {
            // Handle unexpected exceptions
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error inserting employee: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/getEmployees")
    public ResponseEntity<?> getEmployees(@RequestParam(required = false) Integer id) {
        try {
            List<Employee> employees = employeeService.getEmployees(id);
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error fetching employees: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/filterEmployees")
    public ResponseEntity<?> filterEmployees(
            @RequestParam(required = false) String dept,
            @RequestParam(required = false) String role) {
        try {
            // Check if both filters are null
            if (dept == null && role == null) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Please provide at least one filter parameter: dept or role.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Fetch employees based on filters
            List<Employee> employees = employeeService.filterEmployees(dept, role);

            // Check if no employees match the filter criteria
            if (employees.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "No employees found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            // Return the list of employees
            return ResponseEntity.ok(employees);

        } catch (Exception e) {
            // Handle unexpected errors
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error fetching employees: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("searchByName/{name}")
    public ResponseEntity<?> getEmployeeByName(@PathVariable String name) {
        try {
            List<Employee> employees = employeeService.getEmployeesByName(name);
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error fetching employees: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PutMapping("/update-details")
    public ResponseEntity<Map<String, Object>> updateDetails(@RequestBody Employee updateEmployee) {
        Map<String, Object> response = new HashMap<>();

        try {
            ResponseEntity<String> result = employeeService.updateDetails(updateEmployee);
            response.put("status", "Success");
            response.put("message", result);
            response.put("statusCode", HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "Failure");
            response.put("message", "Error updating data: " + e.getMessage());
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/delete-data/{id}")
    public ResponseEntity<Map<String, String>> deleteEmployee(@PathVariable int id) {
        Map<String, String> response = new HashMap<>();

        try {
            employeeService.deleteRecord(id);
            response.put("message", "Employee deleted successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Error deleting employee: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
