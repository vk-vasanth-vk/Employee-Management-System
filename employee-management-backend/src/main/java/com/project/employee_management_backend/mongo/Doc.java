package com.project.employee_management_backend.mongo;

//import jdk.incubator.vector.VectorOperators;
import lombok.*;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Service;

@Getter
@Setter
@Service
@NoArgsConstructor
@Document(collection = "files")
public class Doc {
    @Id
    private String id;

    private String name;
    private String dept;
    private String email;
    private String phone;
    private String role;
    private String salary;
    private String experience;

    private FileDetails fileDetails;
}
