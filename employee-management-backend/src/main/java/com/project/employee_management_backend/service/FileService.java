package com.project.employee_management_backend.service;

import com.project.employee_management_backend.jpa.FileEntity;
import com.project.employee_management_backend.jpa.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileService {

    @Autowired
    @Qualifier("fileRepoJpa")
    private FileRepository fileRepository;

    public FileEntity saveFile(MultipartFile file) throws IOException {
        FileEntity fileEntity = new FileEntity();
        fileEntity.setFileName(file.getOriginalFilename());
        fileEntity.setFileType(file.getContentType());
        fileEntity.setFileSize(file.getSize());
        fileEntity.setFileData(file.getBytes());
        return fileRepository.save(fileEntity);
    }

    public FileEntity getFile(Integer id) {
        return fileRepository.findById(id)
                .orElse(null);
    }
}

