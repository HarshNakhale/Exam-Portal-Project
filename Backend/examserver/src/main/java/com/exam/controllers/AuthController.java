package com.exam.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.models.AuthenticationResponse;
import com.exam.models.User;
import com.exam.models.UserLogin;
import com.exam.repository.UserRepository;
import com.exam.services.impl.AuthenticationService;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class AuthController {

	@Autowired
	private AuthenticationService authenticationService;
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("test")
	public String test() {
		return "Welcome to the Exam Portal.";
	}
	
	@PostMapping("register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody User request) throws Exception{
		return ResponseEntity.ok(authenticationService.register(request));
	}
	
	@PostMapping("login")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody UserLogin request){
		return ResponseEntity.ok(authenticationService.authenticate(request));
		
	}
	
	@GetMapping("current-user")
	public User getCurrentUer(Principal principal) {
		return this.userRepository.findByUsername(principal.getName());
	}
}
