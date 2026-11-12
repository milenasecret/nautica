package com.nautica.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;// Will be stored as Bcrypt hash

    private LocalDateTime createdAt;

    @Column(nullable = true)
    private Boolean isAdmin;

    @Column(nullable = true)
    private String firstname;

    @Column(nullable = true)
    private String lastname;

    @Column(nullable = true)
    private String address;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<FileEntity> documents = new ArrayList<>();

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
