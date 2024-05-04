package org.dolymy.quiz.controllers;

import lombok.RequiredArgsConstructor;
import org.dolymy.quiz.entities.Answer;
import org.dolymy.quiz.services.AnswerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes/answers")
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;


    @GetMapping("/getAllAnswers")
    public List<Answer> getAllAnswers(){

        return answerService.getAllAnswers();
    }

    @GetMapping("/{id}")
    public Answer getAnswerById(@PathVariable Long id) {
        return this.answerService.findAnswerById(id);
    }

}
