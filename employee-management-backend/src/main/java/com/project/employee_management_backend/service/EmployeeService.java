package com.project.employee_management_backend.service;

import com.project.employee_management_backend.model.Employee;
import com.project.employee_management_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private EmployeeRepository employeeRepository;

    public void insertEmployee(Employee employee) {
        Employee.validateEmployee(employee);

        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (employeeRepository.existsByPhoneNo(employee.getPhoneNo())) {
            throw new RuntimeException("Phone number already exists");
        }

        employeeRepository.save(employee);
    }

    public List<Employee> getEmployees(Integer id) {
        if (id != null) {
            return employeeRepository.findById(id)
                    .map(Collections::singletonList)
                    .orElse(Collections.emptyList());
        }
        return employeeRepository.findAll();
    }

    public List<Employee> filterEmployees(String dept, String role) {
        if (dept != null && role != null) {
            return employeeRepository.findByDepartmentAndRole(dept, role);
        } else if (dept != null) {
            return employeeRepository.findByDepartment(dept);
        } else if (role != null) {
            return Collections.emptyList();
        }
        return Collections.emptyList();
    }

    public List<Employee> getEmployeesByName(String name) {
        if(name == null || name.isEmpty()) {
            throw new RuntimeException("Employee name cannot be empty");
        } else {
            if(employeeRepository.existsByName(name)) {
                return employeeRepository.findByName(name);
            } else {
                return Collections.emptyList();
            }
        }
    }

    public ResponseEntity<String> updateDetails(Employee updateEmployee) {
        try {
            // Validate employee details before proceeding
            Employee.validateEmployee(updateEmployee);

            // Find the employee by ID
            Optional<Employee> employeeOptional = employeeRepository.findById(updateEmployee.getId());

            if (employeeOptional.isPresent()) {
                Employee existingEmployee = employeeOptional.get();

                boolean isUpdated = Employee.checkUpdation(existingEmployee, updateEmployee);

                // Save only if there is a change
                if (isUpdated) {
                    employeeRepository.save(existingEmployee);
                    return ResponseEntity.ok("Data updated successfully");
                } else {
                    return ResponseEntity.ok("No changes detected");
                }

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
            }
        } catch (Exception e) {
            // Handle any unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating employee: " + e.getMessage());
        }
    }

    public ResponseEntity<String> deleteRecord(int id) {
        if(!employeeRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
        }

        employeeRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted successfully");
    }
}
