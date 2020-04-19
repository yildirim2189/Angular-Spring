package com.yildirimbayrakci.app.controller;

import com.yildirimbayrakci.app.model.Task;
import com.yildirimbayrakci.app.model.User;
import com.yildirimbayrakci.app.payload.request.LoginRequest;
import com.yildirimbayrakci.app.payload.request.SignUpRequest;
import com.yildirimbayrakci.app.payload.response.JwtResponse;
import com.yildirimbayrakci.app.payload.response.MessageResponse;
import com.yildirimbayrakci.app.security.jwt.JwtUtils;
import com.yildirimbayrakci.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  UserService userService;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
    );

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    Set<String> roles = userDetails.getAuthorities().stream()
      .map(auth -> auth.getAuthority()).collect(Collectors.toSet());

    User user = userService.findUserByUsername(loginRequest.getUsername());

    return ResponseEntity.ok(new JwtResponse(jwt, user.getId().toString(), userDetails.getUsername(), user.getEmail(), roles));
  }



  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest){
    if(userService.existsByUsername(signUpRequest.getUsername())){
      return ResponseEntity.badRequest()
        .body(new MessageResponse("Error: Username already exists!"));
    }
    if(userService.existsByEmail(signUpRequest.getEmail())){
      return ResponseEntity.badRequest()
        .body(new MessageResponse("Error: Email is already in user!"));
    }

    // Create new user account and save
    userService.saveUser(signUpRequest);
    // role şimdilik USER olarak atanıyor. başka roller olacak mı?
    return ResponseEntity.ok(new MessageResponse("User registered successfully."));
  }
}
