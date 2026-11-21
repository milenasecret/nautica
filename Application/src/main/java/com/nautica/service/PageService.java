package com.nautica.service;

import com.nautica.PageTypeEnum;
import com.nautica.dto.*;
import com.nautica.exception.ResourceNotFoundException;
import com.nautica.model.ArticleEntity;
import com.nautica.model.PageEntity;
import com.nautica.repository.PageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PageService {
    private final PageRepository pageRepository;

    @Transactional(readOnly = true)
    public PageResponse getPage(Long id) {

        PageEntity page = pageRepository
                .findByIdWithArticles(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Page not found: " + id
                        )
                );

        return mapToResponse(page);
    }

    @Transactional
    public PageResponse updatePage(
            Long id,
            PageUpdateRequest request) {

        PageEntity page = pageRepository
                .findByIdWithArticles(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Page not found: " + id
                        )
                );

        // Update Page title
        page.setTitle(request.title());
        PageEntity savedPage = pageRepository.save(page);

        return mapToResponse(savedPage);
    }

    private void updateArticleFields(
            ArticleEntity article,
            ArticleRequest request) {

        article.setTitle(request.title());
        article.setShortDescription(
                request.shortDescription()
        );
        article.setDescription(
                request.description()
        );
    }

    private PageResponse mapToResponse(PageEntity page) {

        List<ArticleResponse> articles =
                page.getArticles()
                        .stream()
                        .map(article -> new ArticleResponse(
                                article.getId(),
                                page.getId(),
                                article.getTitle(),
                                article.getShortDescription(),
                                article.getDescription()
                        ))
                        .toList();

        return new PageResponse(
                page.getId(),
                page.getTitle(),
                articles
        );
    }

    public PageResponse getPageOfType(PageTypeEnum requestType) {
        PageEntity page = pageRepository
                .findByTypeWithArticles(requestType)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Page not found: " + requestType
                        )
                );

        return mapToResponse(page);
    }
}
