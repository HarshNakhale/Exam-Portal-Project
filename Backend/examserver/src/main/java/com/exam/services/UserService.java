package com.exam.services;

import java.util.Set;
import com.exam.models.User;
import com.exam.models.UserRole;

public interface UserService {

//	Create User
	public User createUser(User user, Set<UserRole> userRole) throws Exception;
	
//	Get User
	public User getUser(String username);
	
	
//	Delete User
	public void deleteUser(Long userId);
}
