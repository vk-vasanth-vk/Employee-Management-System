package com.project.employee_management_backend.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    List<Employee> findByName(String name);
    List<Employee> findByDepartmentOrderByNameAsc(String department);
    List<Employee> findByDepartmentAndRoleOrderByNameAsc(String department, String role);
    List<Employee> findByRoleOrderByNameAsc(String role);
    Boolean existsByEmail(String email);
    Boolean existsByPhoneNo(Long phone);
    Boolean existsByName(String name);
    List<Employee> findAllByOrderByNameAsc();
    List<Employee> findByDepartmentAndName(String department, String name);
    List<Employee> findByRoleAndName(String department, String role);
    List<Employee> findByDepartmentAndRoleAndName(String department, String role, String name);
}
