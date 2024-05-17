package com.exam.services.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.exam.models.User;
import com.exam.models.UserRole;
import com.exam.repository.RoleRepository;
import com.exam.repository.UserRepository;
import com.exam.services.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@Override
	public User createUser(User user, Set<UserRole> userRole) throws Exception {
		// TODO Auto-generated method stub
		User retUser = this.userRepository.findByUsername(user.getUsername());
		if(retUser != null) {
			
//			User already exists
			System.out.println("User Already Exists");
			return null;
//			
		}else {
			
			
//			Add Role to table Roles
			for(UserRole ur:userRole) {
				this.roleRepository.save(ur.getRole());
			}
			
//			Add User to table User
			user.getUserRoles().addAll(userRole);
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			retUser = this.userRepository.save(user);
			return retUser;
			
		}
	}


	@Override
	public User getUser(String username) {
		// TODO Auto-generated method stub
		return this.userRepository.findByUsername(username);
	}


	@Override
	public void deleteUser(Long userId) {
		// TODO Auto-generated method stub
		
		this.userRepository.deleteById(userId);
		
	}


	
}
