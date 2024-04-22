package org.dolymy.quiz.controllers;

import lombok.RequiredArgsConstructor;
import org.dolymy.quiz.entities.Question;
import org.dolymy.quiz.services.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes/questions")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;
    @PostMapping("/add-question")
    public Question addQuestion(@RequestBody Question q) {

        return this.questionService.addQuestion(q);
    }

    @GetMapping("/getAllQuestions")
    public List<Question> getAllQuestions(){

        return questionService.getAllQuestions();
    }

    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable String id) {
        return this.questionService.findQuestionById(id);
    }

    @PutMapping("/update-question/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable String id, @RequestBody Question updatedQuestion) {
        return questionService.updateQuestion(id, updatedQuestion);
    }

    @PostMapping("/{quizId}")
    public ResponseEntity<Question> affectQuestionToQuiz(@PathVariable("quizId") String quizId, @RequestBody Question question) {
        Question createdQuestion = questionService.affectQuestionToQuiz(quizId, question);
        if (createdQuestion != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdQuestion);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable String id) {
        try {
            // Appeler la méthode deleteQuestionAndAnswers du service QuestionService
            questionService.deleteQuestionAndAnswers(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            // En cas d'erreur, renvoyer une réponse avec un code d'erreur interne du serveur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Échec de la suppression de la question : " + e.getMessage());
        }
    }


}
