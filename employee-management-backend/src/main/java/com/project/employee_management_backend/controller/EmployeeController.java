package com.project.employee_management_backend.controller;

import com.project.employee_management_backend.model.Employee;
import com.project.employee_management_backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Map<String, String>> insertRecord(@RequestBody Map<String, String> payload) {
        String name = payload.get("name");
        String dept = payload.get("dept");
        String role = payload.get("role");
        String email = payload.get("email");
        String salaryStr = payload.get("salary");
        String phoneStr = payload.get("phone");

        // Validate fields
        if (name == null || name.isEmpty() || email == null || email.isEmpty()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Name and Email cannot be empty");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Validate numeric fields
        float salary;
        Long phone;

        try {
            salary = Float.parseFloat(salaryStr);
        } catch (NumberFormatException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid salary format");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        try {
            phone = Long.parseLong(phoneStr);
        } catch (NumberFormatException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid phone number format");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        try {
            // Insert employee data
            employeeService.insertEmployee(name, dept, role, email, salary, phone);

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

    @GetMapping({"/getEmployees/{id}","/getEmployees"})
    public ResponseEntity<List<Employee>> getEmployees(@PathVariable(required = false) Integer id) {
        try {
            List<Employee> employees = employeeService.getEmployees(id);
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error fetching employees: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("getEmployeesByDept/{dept}")
    public ResponseEntity<List<Employee>> getEmployeesByDept(@PathVariable String dept) {
        try {
            List<Employee> employees = employeeService.getEmployeesByDept(dept);
            return ResponseEntity.ok(employees);
        }
        catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error fetching employees: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("searchByName/{name}")
    public ResponseEntity<List<Employee>> getEmployeeByName(@PathVariable String name) {
        try {
            List<Employee> employees = employeeService.getEmployeesByName(name);
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error fetching employees: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/update-details")
    public ResponseEntity<Map<String, Object>> updateDetails(@RequestBody Employee updateEmployee) {
        Map<String, Object> response = new HashMap<>();

        try {
            String result = employeeService.updateDetails(updateEmployee);
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
