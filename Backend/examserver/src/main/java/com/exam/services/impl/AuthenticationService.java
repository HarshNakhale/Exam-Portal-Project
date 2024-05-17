package com.exam.services.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.exam.models.AuthenticationResponse;
import com.exam.models.Role;
import com.exam.models.User;
import com.exam.models.UserLogin;
import com.exam.models.UserRole;
import com.exam.repository.UserRepository;
import com.exam.services.UserService;

@Service
public class AuthenticationService {
	
	@Autowired
	private UserRepository userRepository;
	
	
	@Autowired
	private UserServiceImpl userServiceImpl;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	public AuthenticationResponse register(User request) throws Exception{
		Role role = new Role();
		role.setRole_id(2L);
		role.setRole_name("Normal");
		
		Set<UserRole> userRoleSet = new HashSet<>();
		UserRole userRole = new UserRole(request, role);
		userRoleSet.add(userRole);
		
		User retUser = this.userServiceImpl.createUser(request, userRoleSet);
		
		if(retUser == null) {
			throw new Exception("User Already Exists !!.");
		}
		String token = jwtService.generateToken(retUser);
		return new AuthenticationResponse(token);
		
	}
	
	public AuthenticationResponse authenticate(UserLogin request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getUsername(), 
						request.getPassword()
						)
				);
		User user = this.userRepository.findByUsername(request.getUsername());
		String token = jwtService.generateToken(user);
		return new AuthenticationResponse(token);
	}

}
