package com.exam;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
//import java.util.HashSet;
//
//import java.util.Set;
//
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.exam.models.Role;
import com.exam.models.User;
import com.exam.models.UserRole;
import com.exam.services.impl.UserServiceImpl;


@SpringBootApplication()
public class ExamserverApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}
	
	@Autowired
	private UserServiceImpl userServiceImpl;

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
	}
	
//	@Override
//	public void run(String... args) throws Exception {
//		// TODO Auto-generated method stub
//		
//		System.out.println("Testing User Service");
//		
//		User user = new User();
//		
//		user.setUsername("harshnakhale");
//		user.setPassword("Harsh@123");
//		user.setFirst_name("Harsh");
//		user.setLast_name("Nakhale");
//		user.setEmail("harsh@gmail.com");
//		user.setAbout("about");
//		user.setPhone("1234567890");
//		user.setProfile("");
//		
//		Role role = new Role();
//		role.setRole_id(1L);
//		role.setRole_name("Admin");
//		
//		UserRole userRole = new UserRole(user, role);
//		Set<UserRole> userRoleSet = new HashSet<>();
//		userRoleSet.add(userRole);
//		
//		User retUser = this.userServiceImpl.createUser(user, userRoleSet);
//		if(retUser != null) {
//			System.out.println(retUser.getUsername());
//		}
//		
//	}

}
