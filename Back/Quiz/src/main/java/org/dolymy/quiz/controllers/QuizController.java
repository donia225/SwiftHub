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

import java.util.ConcurrentModificationException;
import java.util.List;


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
    public Quiz getQuizById(@PathVariable Long id) {
        return this.quizService.findQuizById(Long.valueOf(id));
    }

    @PutMapping("/update-quiz/{id}")
    public ResponseEntity<?> updateQuiz(@PathVariable Long id, @RequestBody Quiz updatedQuiz) {
        try {
            quizService.updateQuiz(id, updatedQuiz);
            return ResponseEntity.ok().build();
        } catch (ConcurrentModificationException e) {
            // Gérer l'erreur de manière appropriée
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur s'est produite lors de la mise à jour du quiz.");
        }
    }


    @DeleteMapping("/{quizId}")
    public void deleteQuiz(@PathVariable Long quizId) {

        quizService.deleteQuiz(quizId);


    }
}
