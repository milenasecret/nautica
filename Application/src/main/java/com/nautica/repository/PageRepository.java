package com.nautica.repository;

import com.nautica.PageTypeEnum;
import com.nautica.model.PageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PageRepository extends JpaRepository<PageEntity, Long> {
    @Query("""
        SELECT DISTINCT p
        FROM PageEntity p
        LEFT JOIN FETCH p.articles
        WHERE p.id = :id
    """)
    Optional<PageEntity> findByIdWithArticles(@Param("id") Long id);

    @Query("""
        SELECT DISTINCT p
        FROM PageEntity p
        LEFT JOIN FETCH p.articles
        WHERE p.type = :type
    """)
    Optional<PageEntity> findByTypeWithArticles(@Param("type") PageTypeEnum type);
}
