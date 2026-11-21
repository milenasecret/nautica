package com.nautica.service;

import com.nautica.dto.ArticleRequest;
import com.nautica.dto.ArticleResponse;
import com.nautica.exception.ResourceNotFoundException;
import com.nautica.model.ArticleEntity;
import com.nautica.model.PageEntity;
import com.nautica.repository.ArticleRepository;
import com.nautica.repository.PageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final PageRepository pageRepository;

    @Transactional(readOnly = true)
    public ArticleResponse getArticle(Long id) {

        ArticleEntity article = findArticle(id);

        return mapToResponse(article);
    }

    @Transactional
    public ArticleResponse createArticle(
            Long pageId,
            ArticleRequest request) {

        PageEntity page = pageRepository.findById(pageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Page not found: " + pageId
                        )
                );

        ArticleEntity article = new ArticleEntity();

        article.setTitle(request.title());
        article.setShortDescription(
                request.shortDescription()
        );
        article.setDescription(
                request.description()
        );
        article.setPage(page);
        articleRepository.save(article);

        return mapToResponse(article);
    }

    @Transactional
    public ArticleResponse updateArticle(
            Long id,
            ArticleRequest request) {

        ArticleEntity article = findArticle(id);

        article.setTitle(request.title());
        article.setShortDescription(
                request.shortDescription()
        );
        article.setDescription(
                request.description()
        );

        return mapToResponse(article);
    }

    @Transactional
    public void deleteArticle(Long id) {

        ArticleEntity article = findArticle(id);
        articleRepository.delete(article);
    }

    private ArticleEntity findArticle(Long id) {

        return articleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Article not found: " + id
                        )
                );
    }

    private ArticleResponse mapToResponse(
            ArticleEntity article) {

        return new ArticleResponse(
                article.getId(),
                article.getPage().getId(),
                article.getTitle(),
                article.getShortDescription(),
                article.getDescription()
        );
    }
}
