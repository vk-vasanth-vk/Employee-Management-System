package com.project.employee_management_backend.service;

import com.project.employee_management_backend.mongo.Doc;
import com.project.employee_management_backend.mongo.DocRepo;
import com.project.employee_management_backend.mongo.FileDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class DocService {
    @Autowired
    DocRepo docRepo;

    public String addDoc(MultipartFile file, Doc doc) throws IOException {

//        Doc metaData = new Doc();
        FileDetails fileDetails = new FileDetails();

        try {
            // Convert file to Base64 string

            byte[] fileBytes = file.getBytes();
            String base64 = Base64.getEncoder().encodeToString(fileBytes);

            fileDetails.setFileName(file.getOriginalFilename());
            fileDetails.setFileType(file.getContentType());
            fileDetails.setFileSize(file.getSize());
            fileDetails.setFileData(base64);

            doc.setFileDetails(fileDetails);

            docRepo.save(doc);
            return "success";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    public Doc getDoc(String id) {
        return docRepo.findById(id).orElse(null);
    }

    public List<Doc> getAllDocs() {
        return docRepo.findAllByOrderByNameAsc();
    }

    public ResponseEntity<?> updateDoc(MultipartFile file, Doc doc) {
        Optional<Doc> existingDocOpt = docRepo.findById(doc.getId());

        if (existingDocOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Doc existingDoc = existingDocOpt.get();

        // Update only the provided fields
        if (doc.getName() != null) existingDoc.setName(doc.getName());
        if (doc.getEmail() != null) existingDoc.setEmail(doc.getEmail());
        if (doc.getDept() != null) existingDoc.setDept(doc.getDept());
        if (doc.getRole() != null) existingDoc.setRole(doc.getRole());
        if (doc.getPhone() != null) existingDoc.setPhone(doc.getPhone());
        if (doc.getSalary() != null) existingDoc.setSalary(doc.getSalary());
        if (doc.getExperience() != null) existingDoc.setExperience(doc.getExperience());

        // Update file only if provided
        if (file != null && !file.isEmpty()) {
            try {
                byte[] fileBytes = file.getBytes();
                String base64 = Base64.getEncoder().encodeToString(fileBytes);

                FileDetails fileDetails = new FileDetails();
                fileDetails.setFileName(file.getOriginalFilename());
                fileDetails.setFileType(file.getContentType());
                fileDetails.setFileSize(file.getSize());
                fileDetails.setFileData(base64);

                existingDoc.setFileDetails(fileDetails);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File processing failed");
            }
        }

        docRepo.save(existingDoc);
        return ResponseEntity.ok("Data updated successfully");
    }

    public ResponseEntity<?> deleteDoc(List<String> idList) {
        for (String id : idList) {
            if (docRepo.existsById(id)) {
                docRepo.deleteById(id);
            }
        }
        return ResponseEntity.ok("Data deleted successfully");
    }
    
    public List<Doc> filterEmployees(String dept, String role, String name) {
        if(dept != null && name != null && role != null) {
            return docRepo.findByDeptAndRoleAndName(dept, role, name);
        }
        if(dept != null && role != null) {
            return docRepo.findByDeptAndRoleOrderByNameAsc(dept, role);
        }
        if(role != null && name != null) {
            return docRepo.findByRoleAndName(role, name);
        }
        if(dept != null && name != null) {
            return docRepo.findByDeptAndName(dept, name);
        }
        if(dept != null) {
            return docRepo.findByDeptOrderByNameAsc(dept);
        }
        if(role != null) {
            return docRepo.findByRoleOrderByNameAsc(role);
        }
        if(name != null) {
            return docRepo.findByName(name);
        }
        return Collections.emptyList();
    }
}
