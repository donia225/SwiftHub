package org.dolymy.quiz.controllers;



import org.dolymy.quiz.DTO.ResultDTO;
import org.dolymy.quiz.entities.Quiz;
import org.dolymy.quiz.repos.QuizRepository;
import org.dolymy.quiz.services.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/quizzes/result")

public class ResultController {

    private final ResultService resultService;

    private final QuizRepository quizRepository;

    @Autowired
    public ResultController(ResultService resultService, QuizRepository quizRepository) {
        this.resultService = resultService;


        this.quizRepository = quizRepository;
    }

    @GetMapping("/calculate-score/{quizId}")
    public ResponseEntity<Double> calculateScoreByQuizId(@PathVariable Long quizId) {
        double score = resultService.calculateScoreByQuizId(quizId);
        return ResponseEntity.ok(score);
    }
    @PostMapping("/results")
    public ResponseEntity<?> saveResult(@RequestBody ResultDTO resultDTO) {
        Optional<Quiz> optionalQuiz = quizRepository.findById(resultDTO.getQuizId());
        if (optionalQuiz.isPresent()) {
            try {
                resultService.saveResult(resultDTO);
                return ResponseEntity.ok().body("{\"message\": \"Result saved successfully\"}");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("{\"message\": \"An error occurred while saving the result\"}");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"message\": \"Quiz not found for id: " + resultDTO.getQuizId() + "\"}");
        }
    }
    }


