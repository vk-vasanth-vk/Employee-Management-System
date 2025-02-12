package com.project.employee_management_backend.controller;

import com.project.employee_management_backend.mongo.Doc;
import com.project.employee_management_backend.service.DocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class EmployeeController {

    @Autowired
    private DocService docService;

    @PostMapping("/addDoc")
    public String addDoc(@RequestParam("file") MultipartFile file,
                         @ModelAttribute Doc doc
    ) {
        try {
            String msg = docService.addDoc(file, doc);

            return msg;
        } catch (Exception e) {
            return "Error adding file: " + e.getMessage();
        }
    }

    @GetMapping("/getAllDocs")
    public ResponseEntity<?> getAllDocs() {
        List<Doc> docs = docService.getAllDocs();
        return ResponseEntity.ok(docs);
    }

    @PutMapping("/update-details")
    public ResponseEntity<?> updateDetails(@RequestParam("file") MultipartFile file,
                                           @ModelAttribute Doc doc) {
        try {
            docService.updateDoc(file, doc);
            return ResponseEntity.ok(Collections.singletonMap("message", "Employee details updated successfully."));
        } catch (Exception e) {
            // Return error message in JSON format
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @DeleteMapping("/delete-data/{idList}")
    public ResponseEntity<Map<String, String>> deleteEmployee(@PathVariable List<String> idList) {
        Map<String, String> response = new HashMap<>();

        try {
            docService.deleteDoc(idList);
            response.put("message", "Employee deleted successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Handle exceptions and return error message
            response.put("message", "Error deleting employee: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/filterEmployees")
    public ResponseEntity<?> filterEmployees(
            @RequestParam(required = false) String dept,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String name) {
        try {
            if (dept == null && role == null && name == null) {
                // Return error if no filter parameter is provided
                Map<String, String> response = new HashMap<>();
                response.put("message", "Provide at least one filter parameter");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            List<Doc> employees = docService.filterEmployees(dept, role, name);
            return ResponseEntity.ok(employees);

        } catch (Exception e) {
            // Handle exceptions and return error message
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error fetching employees: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("downloadFile/{id}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable String id) {
        Doc doc = docService.getDoc(id);

        if (doc == null || doc.getFileDetails() == null || doc.getFileDetails().getFileData() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Handle errors (file not found)
        }

        byte[] fileBytes = Base64.getDecoder().decode(doc.getFileDetails().getFileData()); // Decode the base64 file
        String fileName = doc.getFileDetails().getFileName();

        // Set response headers for file download
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(doc.getFileDetails().getFileType())); // File content type
        headers.setContentDisposition(ContentDisposition.attachment().filename(fileName).build()); // Set as an attachment for download

        return new ResponseEntity<>(fileBytes, headers, HttpStatus.OK); // Return the file as a response
    }

    @GetMapping("viewFile/{id}")
    public ResponseEntity<String> viewFile(@PathVariable String id) {
        Doc doc = docService.getDoc(id);

        if (doc == null || doc.getFileDetails() == null || doc.getFileDetails().getFileData() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        String base64Data = doc.getFileDetails().getFileData(); // Base64 encoded file
        String fileType = doc.getFileDetails().getFileType();  // e.g., "image/png", "application/pdf"

        // Construct a Data URL (data:image/png;base64,....)
        String base64Response = "data:" + fileType + ";base64," + base64Data;

        return ResponseEntity.ok(base64Response);
    }
}
