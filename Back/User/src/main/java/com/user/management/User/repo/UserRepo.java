package com.user.management.User.repo;

import com.user.management.User.user.Role;
import com.user.management.User.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepo extends MongoRepository<User,String> {
    Optional<User> findByEmail(String email);

    Optional <User> findUserById(String id);
    Optional <User> findUserByEmail(String email);

    List<User> findUserByRole(Role role);
}
