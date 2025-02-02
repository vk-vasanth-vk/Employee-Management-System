package com.project.employee_management_backend.controller;

import com.project.employee_management_backend.jpa.Employee;
import com.project.employee_management_backend.jpa.FileEntity;
import com.project.employee_management_backend.mongo.Doc;
import com.project.employee_management_backend.service.DocService;
import com.project.employee_management_backend.service.EmployeeService;
import com.project.employee_management_backend.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

import java.lang.Integer;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private FileService fileService;

    @Autowired
    private DocService docService;

    /**
     * Inserts a new employee record.
     *
     * @param employee the employee details to be inserted
     * @return a response entity containing a success or error message
     */
    @PostMapping("/insertRecord")
    public ResponseEntity<Map<String, String>> insertRecord(@RequestBody Employee employee) {
        try {
            // Insert employee data
            employeeService.insertEmployee(employee);

            // Return success message
            Map<String, String> successResponse = new HashMap<>();
            successResponse.put("message", "Employee added successfully!");
            return ResponseEntity.ok(successResponse);

        } catch (Exception e) {
            // Handle unexpected exceptions
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Problem from controller", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Retrieves a list of employees, optionally filtered by ID.
     *
     * @return a response entity containing the list of employees or an error message
     */
    @GetMapping("/getEmployees")
    public ResponseEntity<?> getEmployees() {
        try {
            List<Employee> employees = employeeService.getEmployees();
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            // Handle exceptions and return error message
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error fetching employees: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Filters employees by department or role.
     *
     * @param dept the optional department to filter by
     * @param role the optional role to filter by
     * @return a response entity containing the list of filtered employees or an error message
     */
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

            List<Employee> employees = employeeService.filterEmployees(dept, role, name);
            return ResponseEntity.ok(employees);

        } catch (Exception e) {
            // Handle exceptions and return error message
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error fetching employees: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Retrieves employees by name.
     *
     * @param name the name of the employee to search for
     * @return a response entity containing the list of employee(s) or an error message
     */
    @GetMapping("searchByName/{name}")
    public ResponseEntity<?> getEmployeeByName(@RequestParam(required = false) String dept,
                                               @RequestParam(required = false) String name) {
        try {
            List<Employee> employees = employeeService.getEmployeesByNameAndDept(name,dept);
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            // Handle exceptions and return error message
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error fetching employees: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Updates the details of an existing employee.
     *
     * @param updateEmployee the updated employee details
     * @return a response entity containing a success or error message
     */
    @PutMapping("/update-details")
    public ResponseEntity<?> updateDetails(@RequestBody Employee updateEmployee) {
        try {
            employeeService.updateDetails(updateEmployee);
            return ResponseEntity.ok(Collections.singletonMap("message", "Employee details updated successfully."));
        } catch (Exception e) {
            // Return error message in JSON format
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    /**
     * Deletes employees by a list of IDs.
     *
     * @param idList the list of employee IDs to be deleted
     * @return a response entity containing a success or error message
     */
    @DeleteMapping("/delete-data/{idList}")
    public ResponseEntity<Map<String, String>> deleteEmployee(@PathVariable List<Integer> idList) {
        Map<String, String> response = new HashMap<>();

        try {
            employeeService.deleteRecord(idList);
            response.put("message", "Employee deleted successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Handle exceptions and return error message
            response.put("message", "Error deleting employee: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/uploadFile")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            fileService.saveFile(file);
            return ResponseEntity.ok("File uploaded successfully: " + file.getOriginalFilename());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/getFile/{id}")
    public ResponseEntity<?> getFile(@PathVariable Integer id) {
        FileEntity fileEntity = fileService.getFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntity.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(fileEntity.getFileType()))
                .body(fileEntity.getFileData());
    }

    @PostMapping("/addDoc")
    public Doc addDoc(@RequestBody Doc doc) {
        return docService.addDoc(doc);
    }

    @GetMapping("/getDocs/{id}")
    public ResponseEntity<?> getDocs(@PathVariable String id) {
        // Fetch the document by ID
        Doc doc = docService.getDoc(id);

        if (doc == null) {
            return ResponseEntity.notFound().build();  // Return 404 if not found
        }

        // Check if the data is null or empty before attempting to convert
        if (doc.getData() == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Document data is empty or corrupted");
        }

        // Return the document data along with other properties
//        return ResponseEntity.ok(new DocumentResponse(
//                doc.getId(),
//                doc.getFileName(),
//                doc.getDataAsBase64()  // Get Base64 representation of the Binary data
//        ));
        return ResponseEntity.ok(doc);
    }

    // DTO to return Base64 string in API response
//    class DocumentResponse {
//        private String id;
//        private String fileName;
//        private String base64Data;
//
//        public DocumentResponse(String id, String fileName, String base64Data) {
//            this.id = id;
//            this.fileName = fileName;
//            this.base64Data = base64Data;
//        }
//
//        // Getters
//        public String getId() { return id; }
//        public String getFileName() { return fileName; }
//        public String getBase64Data() { return base64Data; }
//    }
}
