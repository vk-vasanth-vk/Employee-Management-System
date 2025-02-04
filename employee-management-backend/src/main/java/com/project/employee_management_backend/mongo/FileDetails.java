package com.project.employee_management_backend.mongo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileDetails {
    private String fileName;
    private String fileType;
    private long fileSize;
    private String fileData;
}
