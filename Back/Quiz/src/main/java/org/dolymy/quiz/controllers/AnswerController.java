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
    @PostMapping("/add-answer")
    public Answer addAnswer(@RequestBody Answer answer) {

        return this.answerService.addAnswer(answer);
    }

    @GetMapping("/getAllAnswers")
    public List<Answer> getAllAnswers(){

        return answerService.getAllAnswers();
    }

    @GetMapping("/{id}")
    public Answer getAnswerById(@PathVariable String id) {
        return this.answerService.findAnswerById(id);
    }
    @PutMapping("/update-answer/{id}")
    public ResponseEntity<?> updateAnswer(@PathVariable String id, @RequestBody Answer updatedAnswer) {
        return answerService.updateAnswer(id, updatedAnswer);
    }
}
