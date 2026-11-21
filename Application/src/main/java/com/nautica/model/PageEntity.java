package com.nautica.model;

import com.nautica.PageTypeEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "page")
@Data
@NoArgsConstructor
public class PageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private PageTypeEnum type;

    @OneToMany(
            mappedBy = "page",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ArticleEntity> articles = new ArrayList<>();
}
