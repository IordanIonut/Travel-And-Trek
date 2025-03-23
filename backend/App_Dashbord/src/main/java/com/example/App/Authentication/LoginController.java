package com.example.App.Authentication;

import com.example.App.AppDashbordApplication;
import com.example.App.Dashbord.Model.User;
import com.example.App.Dashbord.Repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class LoginController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JWT jwtUtil;

    public LoginController(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, CustomUserDetailsService userDetailsService, JWT jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already in use"));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));  // Encode password
        user.setId(AppDashbordApplication.generateId());
        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getName(), user.getPassword());

        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            String token = jwtUtil.generateToken(userDetails.getUsername(), userDetails.getPassword());

            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }
    }

    @PostMapping("/test/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
            String token = jwtUtil.generateToken(userDetails.getUsername(), userDetails.getPassword());
            System.out.println("token: "+ token);
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Authentication failed: " + e.getMessage());
        }
    }


    @PostMapping("/test/register")
    public ResponseEntity<?> register1(@RequestBody User user) {
        user.setId(AppDashbordApplication.generateId());
        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getName(), user.getPassword());
        return ResponseEntity.ok(Map.of("token", token));
    }
}
