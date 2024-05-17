package com.exam.controllers;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.models.Role;
import com.exam.models.User;
import com.exam.models.UserRole;
import com.exam.services.UserService;
import com.exam.services.impl.UserServiceImpl;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserServiceImpl userServiceImpl;
	
//	Create User
	@PostMapping("/add")
	public User createUser(@RequestBody User user) throws Exception {
		
		
		
		return user;
		
	}
	
	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username) {
		
		User retUser = this.userServiceImpl.getUser(username);
		return retUser;
		
	}
	
	@DeleteMapping("/{user_id}")
	public void deleteUser(@PathVariable("user_id") Long user_id) {
		
		this.userServiceImpl.deleteUser(user_id);
		
	}

}
