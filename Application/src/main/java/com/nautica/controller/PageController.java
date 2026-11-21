package com.nautica.controller;

import com.nautica.dto.PageResponse;
import com.nautica.dto.PageTypeRequest;
import com.nautica.dto.PageUpdateRequest;
import com.nautica.service.PageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pages")
@RequiredArgsConstructor
public class PageController {
    private final PageService pageService;

    @GetMapping("/{id}")
    public ResponseEntity<PageResponse> getPage(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                pageService.getPage(id)
        );
    }

    @PatchMapping("/{id}")
    public ResponseEntity<PageResponse> updatePage(
            @PathVariable Long id,
            @RequestBody PageUpdateRequest request) {

        return ResponseEntity.ok(
                pageService.updatePage(id, request)
        );
    }

    @PostMapping("/type")
    public ResponseEntity<PageResponse> getPageOfType(
            @RequestBody PageTypeRequest request) {

        return ResponseEntity.ok(
                pageService.getPageOfType(request.type())
        );
    }
}
