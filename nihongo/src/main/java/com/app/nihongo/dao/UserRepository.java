package com.app.nihongo.dao;


import com.app.nihongo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "user")
public interface UserRepository extends JpaRepository<User,Integer> {
    public User findByUserId(int userId);
    public User findByEmail(String email);
    public User findByUsername(String username);

    public boolean existsByUsername(String username);
    public boolean existsByEmail(String email);

}
