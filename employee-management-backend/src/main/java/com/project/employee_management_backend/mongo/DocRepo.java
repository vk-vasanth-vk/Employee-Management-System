package com.project.employee_management_backend.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocRepo extends MongoRepository<Doc, String> {

}
