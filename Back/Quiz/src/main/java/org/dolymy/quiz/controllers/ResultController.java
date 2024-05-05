package org.dolymy.quiz.controllers;


import org.dolymy.quiz.entities.Result;
import org.dolymy.quiz.services.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/quizzes/result")

public class ResultController {

    private final ResultService resultService;


    @Autowired
    public ResultController(ResultService resultService) {
        this.resultService = resultService;



    }

    @GetMapping("/calculate-score/{quizId}")
    public ResponseEntity<Double> calculateScoreByQuizId(@PathVariable Long quizId) {
        double score = resultService.calculateScoreByQuizId(quizId);
        return ResponseEntity.ok(score);
    }

}
