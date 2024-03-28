package org.dolymy.quiz.controllers;


import org.dolymy.quiz.entities.Quiz;
import org.dolymy.quiz.repos.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequestMapping("/api/quizzes")
@RestController
public class QuizController {
    @Autowired
    private QuizRepository quizRepository;
    @PostMapping("/add-quiz")
    public ResponseEntity<Quiz> addBook(@RequestBody Quiz quiz) {
        Quiz savedQuiz = quizRepository.save(quiz);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedQuiz);
    }

    @GetMapping("/getAllQuizzes")
    public List<Quiz> getAllQuizzes(){
        return quizRepository.findAll();
    }
}
