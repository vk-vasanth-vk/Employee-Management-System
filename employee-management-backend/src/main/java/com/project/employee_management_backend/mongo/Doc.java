package com.project.employee_management_backend.mongo;

//import jdk.incubator.vector.VectorOperators;
import lombok.*;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Service;

@Getter
@Service
@NoArgsConstructor
@Document(collection = "files")
public class Doc {
    @Id
    private String id;
    private String fileName;
    private byte[] data;


//    public String getDataAsBase64() {
//        return java.util.Base64.getEncoder().encodeToString(this.data.getData());
//    }
}
