package com.user.management.User;

import com.user.management.User.repo.UserRepo;
import com.user.management.User.user.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class UserApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserApplication.class, args);
	}
	/*@Bean
	public CommandLineRunner commandLineRunner(
		UserRepo repo
	){
		return args -> {
			var user1= User.builder()
					.username("test3")
					.password("test1")
					.className("arctic7")
					.managedService("test3")
					.email("aaans")
					.department("aa")
					.build();
			repo.insert(user1);

		};*/

	}


