package org.esprit.requestproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing // Active l'auditeur d'audit pour Spring Data MongoDB
public class RequestProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(RequestProjectApplication.class, args);
    }

}
