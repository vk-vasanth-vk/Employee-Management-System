package com.project.employee_management_backend.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("fileRepoJpa")
public interface FileRepository extends JpaRepository<FileEntity, Integer> {
}
