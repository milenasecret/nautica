package com.nautica.repository;

import com.nautica.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    //For login
    Optional<User> findByUsername(String username);

    //For registration validation
    Optional<User> findByEmail(String email);

    //Check if username already exists
    boolean existsByUsername(String username);

    //check if already email exists
    boolean existsByEmail(String email);

    @Query("select u from User u where u.username = :username and u.id != :id")
    Optional<User> existsByUsernameExcludeId(String username, Long id);

    @Query("select u from User u where u.email = :email and u.id != :id")
    Optional<User> existsByEmailExcludeId(String email, Long id);
}
