package com.project.employee_management_backend.service;

import com.project.employee_management_backend.mongo.Doc;
import com.project.employee_management_backend.mongo.DocRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DocService {
    @Autowired
    DocRepo docRepo;

    public Doc getDoc(String id) {
        Doc docs = docRepo.findById(id).orElse(null);
        return docs;
    }

    public Doc addDoc(Doc doc) {
        return docRepo.save(doc);
    }
}
