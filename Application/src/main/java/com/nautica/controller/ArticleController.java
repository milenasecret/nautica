package com.nautica.controller;

import com.nautica.dto.ArticleRequest;
import com.nautica.dto.ArticleResponse;
import com.nautica.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> getArticle(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                articleService.getArticle(id)
        );
    }

    @PostMapping("/page/{pageId}")
    public ResponseEntity<ArticleResponse> createArticle(
            @PathVariable Long pageId,
            @RequestBody ArticleRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(articleService.createArticle(
                        pageId, request
                ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleResponse> updateArticle(
            @PathVariable Long id,
            @RequestBody ArticleRequest request) {

        return ResponseEntity.ok(
                articleService.updateArticle(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(
            @PathVariable Long id) {

        articleService.deleteArticle(id);

        return ResponseEntity.noContent().build();
    }
}
