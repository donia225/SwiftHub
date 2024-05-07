package com.user.management.User.services;

import com.user.management.User.user.User;

import java.util.List;

public interface IUserService {
    public User addUser(User user);
    public List<User> getAllUsers();
    public User updateUser(User user);
    public void deleteUser(String id);
    public User findUserById(String id);

    User findUserByToken(String token);
}
