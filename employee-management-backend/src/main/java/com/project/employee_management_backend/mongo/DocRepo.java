package com.project.employee_management_backend.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocRepo extends MongoRepository<Doc, String> {
    List<Doc> findByDeptAndRoleAndName(String dept, String role, String name);
    List<Doc> findByDeptAndRoleOrderByNameAsc(String dept, String role);
    List<Doc> findByRoleAndName(String role, String name);
    List<Doc> findByDeptAndName(String dept, String name);
    List<Doc> findByDeptOrderByNameAsc(String dept);
    List<Doc> findByRoleOrderByNameAsc(String role);
    List<Doc> findByName(String name);
    List<Doc> findAllByOrderByNameAsc();
}
