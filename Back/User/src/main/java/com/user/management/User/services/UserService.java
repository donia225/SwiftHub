package com.user.management.User.services;

import com.user.management.User.exception.UserNotFoundEception;
import com.user.management.User.repo.TokenRepo;
import com.user.management.User.repo.UserRepo;
import com.user.management.User.token.Token;
import com.user.management.User.user.User;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService  implements IUserService{
    @Resource
    UserRepo userRepo;
    @Resource
    TokenRepo tokenRepo;


    @Override
    public User addUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return  userRepo.findAll();
    }

    @Override
    public User updateUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public void deleteUser(String id) {
        userRepo.deleteById(id);
    }

    @Override
    public User findUserById(String id) {
        return userRepo.findUserById(id)
                .orElseThrow(() -> new UserNotFoundEception("User by id "+ id +"was not found"));
    }

    @Override
    public User findUserByToken(String token) {
        User userfound =null;
       if (token!=null){
           Optional<Token> optionalToken=this.tokenRepo.findByToken(token);
           if (optionalToken.isPresent()){
               userfound=optionalToken.get().getUser();
           }
       }
        System.out.println(userfound);
       return userfound;
    }
}
