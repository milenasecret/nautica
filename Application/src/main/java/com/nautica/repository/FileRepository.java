package com.nautica.repository;

import com.nautica.model.FileEntity;
import com.nautica.model.FilePageEnum;
import com.nautica.model.PageEntity;
import com.nautica.model.PageTypeEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {

	List<FileEntity> findByUserId(Long userId);
    Optional<FileEntity> findByIdAndUserId(Long id, Long userId);

    @Query("""
        SELECT DISTINCT f
        FROM FileEntity f
        WHERE f.filePage = :type
    """)
    List<FileEntity> findAllByPageType(@Param("type") FilePageEnum type);
}
