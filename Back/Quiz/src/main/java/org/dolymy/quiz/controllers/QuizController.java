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
    public List<Quiz> getAllQuizzes(){

        return quizService.getAllQuizzes();
    }

    @GetMapping("/{id}")
    public Quiz getQuizById(@PathVariable String id) {
        return this.quizService.findQuizById(id);
    }
    @PutMapping("/update-quiz/{id}")
    public ResponseEntity<?> updateQuiz(@PathVariable String id, @RequestBody Quiz updatedQuiz) {
        return quizService.updateQuiz(id, updatedQuiz);
    }

    @DeleteMapping("/{quizId}")
    public ResponseEntity<?> deleteQuiz(@PathVariable String quizId) {
        try {
            quizService.deleteQuiz(quizId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete quiz: " + e.getMessage());
        }
    }
}
