package com.project.employee_management_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // Auto-generated ID column
    private String name; // Single column for storing names
    private String department;
    private String role;
    private String email;
    private float salary;
    private Long phoneNo;

    // Constructors
    public Employee(String name, String department, String role, String email, float salary, Long phoneNo) {
        this.name = name;
        this.department = department;
        this.role = role;
        this.email = email;
        this.salary = salary;
        this.phoneNo = phoneNo;
    }

    public Employee() {}

    //Getters and Setters
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }
    public void setDepartment(String department) {
        this.department = department;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public float getSalary() {
        return salary;
    }
    public void setSalary(float salary) {
        this.salary = salary;
    }

    public Long getPhoneNo() {
        return phoneNo;
    }
    public void setPhoneNo(Long phoneNo) {
        this.phoneNo = phoneNo;
    }
}
