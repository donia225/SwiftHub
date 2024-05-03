package com.user.management.User.auth;

import com.user.management.User.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String className;
    private String department;
    private String managedService;
    private Role role;
    private boolean mfaEnabled;

}
