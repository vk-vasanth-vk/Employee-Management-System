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

    public Doc getDoc(String id) {
        return docRepo.findById(id).orElse(null);
//        String base64Data = docs.getFileDetails().getFileData();
//        String fileType = docs.getFileDetails().getFileType();
//
//        String base64WithMime = "data:" + fileType + ";base64," + base64Data;
//
//        return base64WithMime;
    }

    public List<Doc> getAllDocs() {
        return docRepo.findAllByOrderByNameAsc();
    }

    public String addDoc(MultipartFile file, String name, String email, String dept, String role, String phone, String salary, String exp) throws IOException {
        // Create file metadata
//        if(file == null || file.isEmpty()) {
//            return "file is null or empty";
//        }
        Doc metaData = new Doc();
        FileDetails fileDetails = new FileDetails();

        try {
            // Convert file to Base64 string
            byte[] fileBytes = file.getBytes();
            String base64 = Base64.getEncoder().encodeToString(fileBytes);

            metaData.setName(name);
            metaData.setEmail(email);
            metaData.setDept(dept);
            metaData.setRole(role);
            metaData.setPhone(phone);
            metaData.setSalary(salary);
            metaData.setExperience(exp);

            fileDetails.setFileName(file.getOriginalFilename());
            fileDetails.setFileType(file.getContentType());
            fileDetails.setFileSize(file.getSize());
            fileDetails.setFileData(base64);

            metaData.setFileDetails(fileDetails);

            docRepo.save(metaData);
            return "success";
        } catch (Exception e) {
            return e.getMessage();
        }
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

    public ResponseEntity<?> deleteDoc(List<String> idList) {
        for (String id : idList) {
            if (docRepo.existsById(id)) {
                docRepo.deleteById(id);
            }
        }
        return ResponseEntity.ok("Data deleted successfully");
    }

    public ResponseEntity<?> updateDoc(MultipartFile file, String id, String name, String email, String dept, String role, String phone, String salary, String exp) {
        Optional<Doc> existingDocOpt = docRepo.findById(id);

        if (existingDocOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Doc existingDoc = existingDocOpt.get();

        // Update only the provided fields
        if (name != null) existingDoc.setName(name);
        if (email != null) existingDoc.setEmail(email);
        if (dept != null) existingDoc.setDept(dept);
        if (role != null) existingDoc.setRole(role);
        if (phone != null) existingDoc.setPhone(phone);
        if (salary != null) existingDoc.setSalary(salary);
        if (exp != null) existingDoc.setExperience(exp);

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

}
