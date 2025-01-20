package com.project.employee_management_backend.service;

import com.project.employee_management_backend.model.Employee;
import com.project.employee_management_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private EmployeeRepository employeeRepository;

    public void insertEmployee(String name, String department, String role, String email, float salary, Long phone) {
        Employee employee = new Employee(name, department,role, email, salary, phone);
        employeeRepository.save(employee);
    }

    public List<Employee> getEmployees(Integer id) {
        if(id != null) {
            return employeeRepository.findById(id)
                    .map(Collections::singletonList)
                    .orElse(Collections.emptyList());
        }
        return employeeRepository.findAll();
    }

    public List<Employee> getEmployeesByDept(String dept) {
            return employeeRepository.findByDepartment(dept);
    }

    public List<Employee> getEmployeesByName(String name) {
        return employeeRepository.findByName(name);
    }

    public String updateDetails(Employee updateEmployee) {
        Optional<Employee> employee = employeeRepository.findById((updateEmployee.getId()));

        if(employee.isPresent()) {
            Employee existingEmployee = employee.get();
            existingEmployee.setName(updateEmployee.getName());
            existingEmployee.setDepartment(updateEmployee.getDepartment());
            existingEmployee.setRole(updateEmployee.getRole());
            existingEmployee.setEmail(updateEmployee.getEmail());
            existingEmployee.setSalary(updateEmployee.getSalary());
            existingEmployee.setPhoneNo(updateEmployee.getPhoneNo());

            employeeRepository.save(existingEmployee);
            return "Data updated successfully";
        } else {
            return "Data not found";
        }
    }

    public void deleteRecord(int id) {
        if(!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found");
        }

        employeeRepository.deleteById(id);
    }
}


