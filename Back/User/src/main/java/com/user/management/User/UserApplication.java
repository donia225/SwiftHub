package com.user.management.User;

import com.user.management.User.repo.TokenRepo;
import com.user.management.User.repo.UserRepo;
import com.user.management.User.token.Token;
import com.user.management.User.token.TokenType;
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
	public CommandLineRunner commandLineRunner(TokenRepo tokenRepo, UserRepo userRepo) {
		return args -> {
			// Récupérer l'utilisateur par son ID
			String userId = "662e5e68b95e5806398f2d67";
			User user = userRepo.findById(userId).orElse(null);

			if (user != null) {
				// Créer et enregistrer un token dans la base de données
				Token token = Token.builder()
						.token("votre_token")
						.tokenType(TokenType.BEARER)
						.expired(false)
						.revoked(false)
						.user(user) // Utilisez directement l'objet User pour associer le token
						.build();

				tokenRepo.save(token);

				// Ajouter le token à la liste des tokens de l'utilisateur
				user.getTokens().add(token);
				userRepo.save(user); // Enregistrer la mise à jour de l'utilisateur

				System.out.println("Token ajouté avec succès à l'utilisateur : " + user.getUsername());
			} else {
				System.out.println("Utilisateur non trouvé avec l'ID : " + userId);
			}
		}};*/
	}