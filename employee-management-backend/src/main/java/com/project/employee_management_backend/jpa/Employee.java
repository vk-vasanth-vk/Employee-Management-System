package com.project.employee_management_backend.jpa;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String department;
    private String role;
    private String email;
    private Float salary;
    private Long phoneNo;
    private Integer year_of_experience;

}
