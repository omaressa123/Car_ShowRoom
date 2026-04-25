package com.carshowroom.mycar_showroom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carshowroom.mycar_showroom.dto.ResponseWrapper;
import com.carshowroom.mycar_showroom.entity.Customer;
import com.carshowroom.mycar_showroom.entity.User;
import com.carshowroom.mycar_showroom.security.JwtUtil;
import com.carshowroom.mycar_showroom.service.AuthService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthService authService;

@PostMapping("/login")
    public ResponseEntity<ResponseWrapper<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            String token = jwtUtil.generateToken(authentication);
            String role = authentication.getAuthorities().iterator().next().getAuthority();
            LoginResponse response = new LoginResponse(token, request.getUsername(), role);
            return ResponseEntity.ok(ResponseWrapper.success("Login successful", response));
        } catch (AuthenticationException e) {
            return ResponseEntity.ok(ResponseWrapper.error("Invalid credentials"));
        }
    }

@PostMapping("/register")
    public ResponseEntity<ResponseWrapper<Void>> register(@Valid @RequestBody RegisterRequest request) {
        try {
            if (authService.userExists(request.getUsername())) {
                return ResponseEntity.ok(ResponseWrapper.error("Username already exists"));
            }

            Customer customer = new Customer();
            customer.setFullName(request.getFullName());
            customer.setEmail(request.getEmail());
            customer.setPhone(request.getPhone());
            customer = authService.saveCustomer(customer);

            User user = new User();
            user.setUsername(request.getUsername());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole("ROLE_CUSTOMER"); // Set role
            user.setCustomer(customer);
            user = authService.saveUser(user);
            
            // Set the reverse relationship
            customer.setUser(user);
            authService.saveCustomer(customer);

            return ResponseEntity.ok(ResponseWrapper.success("Registration successful"));
        } catch (Exception e) {
            return ResponseEntity.ok(ResponseWrapper.error("Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok("Logged out successfully");
    }
}

// DTOs
class LoginRequest {
    @NotBlank(message = "Username required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Username must not contain numbers or special characters")
    private String username;

    @NotBlank(message = "Password required")
    private String password;
    
    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

class RegisterRequest {
    @NotBlank(message = "Username required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Username must not contain numbers or special characters")
    private String username;

    @NotBlank(message = "Password required")
    @Size(min = 6, message = "Password too short")
    private String password;

    @Email(message = "Invalid email")
    private String email;

    @NotBlank(message = "Full name required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Full name must not contain numbers or special characters")
    private String fullName;

    @NotBlank(message = "Phone number required")
    @Pattern(regexp = "^[0-9]+$", message = "Phone number must contain only numbers")
    private String phone;
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}

class LoginResponse {
    private String token;
    private String username;
    private String role;
    
    public LoginResponse(String token, String username, String role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }
    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}

