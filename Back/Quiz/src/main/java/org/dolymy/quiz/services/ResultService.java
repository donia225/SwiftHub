package org.dolymy.quiz.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.quiz.entities.Answer;
import org.dolymy.quiz.entities.Result;
import org.dolymy.quiz.entities.Role;
import org.dolymy.quiz.entities.User;
import org.dolymy.quiz.repos.ResultRepository;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class ResultService {


    private final ResultRepository resultRepository;

    // Méthode pour créer un nouveau résultat
    public Result createResult(Result result) {
        return resultRepository.save(result);
    }

    // Méthode pour récupérer tous les résultats
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }
    // Méthode pour supprimer un résultat par son ID
    public void deleteResult(String resultId) {
        resultRepository.deleteById(resultId);
    }


    // Méthode pour calculer la note du résultat
    public Result calculateGrade(Result result) {
        double correctAnswersCount = 0;

        // Parcourir toutes les réponses
        for (Answer answer : result.getAnswers()) {
            // Vérifier si la réponse est correcte
            if (answer.isCorrectAnswer()) {
                correctAnswersCount++;
            }
        }

        // Calculer le grade en fonction du nombre de réponses correctes
        double totalAnswers = result.getAnswers().size();
        if (totalAnswers > 0) {
            double percentageCorrect = (correctAnswersCount / totalAnswers) * 100;
            // Arrondir le grade à deux décimales
            double grade = Math.round(percentageCorrect * 100.0) / 100.0;
            result.setGrade(grade);
        } else {
            result.setGrade(0); // Si aucune réponse n'a été donnée, le grade est 0
        }

        // Enregistrer et retourner le résultat mis à jour
        return resultRepository.save(result);
    }
}
