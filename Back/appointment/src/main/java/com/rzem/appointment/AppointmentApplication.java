package com.rzem.appointment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class AppointmentApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppointmentApplication.class, args);
	}

}
