package com.nautica.dto;

import java.util.List;

public record PageResponse(
        Long id,
        String title,
        List<ArticleResponse> articles
) {
}
