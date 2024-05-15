package com.user.management.User.controller;

import com.user.management.User.auth.*;
import com.user.management.User.services.UserService;
import com.user.management.User.user.Role;
import com.user.management.User.user.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ){
        var response = authenticationService.register(request);
        if(request.isMfaEnabled()){
            return ResponseEntity.ok(response);
        }
        return  ResponseEntity.accepted().build();

    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return  ResponseEntity.ok(authenticationService.authenticate(request));

    }
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers()
    {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String id)
    {
        User user = userService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user)
    {
        User user1=userService.addUser(user);
        return new ResponseEntity<>(user1, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user)
    {
        User updateUser=userService.updateUser(user);
        return new ResponseEntity<>(updateUser, HttpStatus.OK);
    }

    @DeleteMapping ("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") String id)
    {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/hello")
    public ResponseEntity<String> sayHello()
    {
        return ResponseEntity.ok("AHLA BIK");
    }

    @PostMapping("/refreshtoken")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authenticationService.refreshToken(request, response);
    }
    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(
            @RequestBody VerificationRequest verificationRequest
    ){
        return ResponseEntity.ok(authenticationService.verifyCode(verificationRequest));

    }

    @GetMapping("{token}")
    public User getUserByToken(@PathVariable("token") String token ){
        return this.userService.findUserByToken(token);
    }

    @GetMapping("email/{email}")
    public User getUserByEmail(@PathVariable("email") String email ){
        return this.userService.findUserByEmail(email);
    }

@GetMapping("username/{username}")
public User getUserByname(@PathVariable("username") String username) {
        return this.userService.findUserByName(username);
}


    @GetMapping("/findd/{role}")
    public List<User> getUserByRole(@PathVariable("role") Role role) {
        List<User> userList = userService.findUserByRole(role);
        return userList;

    }




}
