package com.rzem.appointment;

import com.rzem.appointment.services.EmailSenderService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.util.TimeZone;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class AppointmentApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppointmentApplication.class, args);
	}

	@Autowired
	private EmailSenderService senderService;

	@PostConstruct
	public void init(){
		// Setting Spring Boot SetTimeZone
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

	@EventListener(ApplicationReadyEvent.class)
	public void sendEmail(){
		senderService.sendEmail("mohamed.rzem@esprit.tn",
				"This is email body",
				"This is email subject");
	}
}
