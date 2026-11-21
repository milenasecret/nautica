package com.nautica.repository;

import com.nautica.model.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {

	List<FileEntity> findByUserId(Long userId);
    Optional<FileEntity> findByIdAndUserId(Long id, Long userId);
}
