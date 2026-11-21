package com.nautica.dto;

public record ArticleRequest(
    Long id,
    String title,
    String shortDescription,
    String description) {
}
