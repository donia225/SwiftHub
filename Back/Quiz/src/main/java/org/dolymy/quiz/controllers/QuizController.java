package org.dolymy.quiz.controllers;


import lombok.RequiredArgsConstructor;
import org.dolymy.quiz.entities.Question;
import org.dolymy.quiz.entities.Quiz;
import org.dolymy.quiz.repos.QuizRepository;
import org.dolymy.quiz.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuizController {
    private final QuizService quizService;

    @PostMapping("/add-quiz")
    public Quiz addQuiz(@RequestBody Quiz quiz) {

        return this.quizService.addQuiz(quiz);
    }


    @GetMapping("/getAllQuizzes")
    public List<Quiz> getAllQuizzes() {

        return quizService.getAllQuizzes();
    }

    @GetMapping("/{id}")
    public Quiz getQuizById(@PathVariable String id) {
        return this.quizService.findQuizById(id);
    }

    @PutMapping("/update-quiz/{id}")
    public ResponseEntity<?> updateQuiz(@PathVariable String id, @RequestBody Quiz updatedQuiz) {
        ResponseEntity<?> responseEntity = quizService.updateQuiz(id, updatedQuiz);

        // Vérifiez si la mise à jour du quiz s'est bien déroulée
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            // Si oui, retournez le quiz mis à jour
            Quiz savedQuiz = (Quiz) responseEntity.getBody();

            // Vous pouvez maintenant accéder aux questions mises à jour dans le quiz sauvegardé
            List<Question> updatedQuestions = savedQuiz.getQuestions();

            // Traitez les questions mises à jour si nécessaire

            // Retournez le résultat avec le statut 200 OK
            return ResponseEntity.ok(savedQuiz);
        } else {
            // Si la mise à jour du quiz a échoué, retournez simplement la réponse de l'entité
            return responseEntity;
        }
    }

    @DeleteMapping("/{quizId}")
    public void deleteQuiz(@PathVariable String quizId) {

        quizService.deleteQuiz(quizId);


    }
}
