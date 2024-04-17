package com.user.management.User.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/user")
public class UserController {
    @GetMapping
    public ResponseEntity<String> helloUser(){
        return ResponseEntity.ok("Hello TO OUR SITE WEB");
    }
}
