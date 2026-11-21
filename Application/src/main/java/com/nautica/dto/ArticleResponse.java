package com.nautica.dto;

public record ArticleResponse(
        Long id,
        Long pageId,
        String title,
        String shortDescription,
        String description
) {
}
