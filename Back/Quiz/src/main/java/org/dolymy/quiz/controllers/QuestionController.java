package org.dolymy.quiz.controllers;

import lombok.RequiredArgsConstructor;
import org.dolymy.quiz.entities.Question;
import org.dolymy.quiz.entities.Quiz;
import org.dolymy.quiz.services.QuestionService;
import org.dolymy.quiz.services.QuizService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes/questions")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;



    @GetMapping("/getAllQuestions")
    public List<Question> getAllQuestions(){

        return questionService.getAllQuestions();
    }
    @GetMapping("/all")
    public ResponseEntity<List<Question>> getAllQuestionsWithQuiz() {
        List<Question> questions = questionService.getAllQuestionsWithQuiz();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable Long id) {
        return this.questionService.findQuestionById(id);
    }


    @PostMapping("/{quizId}")
    public ResponseEntity<Question> affectQuestionToQuiz(@PathVariable("quizId") Long quizId, @RequestBody Question question) {
        Question createdQuestion = questionService.affectQuestionToQuiz(quizId, question);
        if (createdQuestion != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdQuestion);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PutMapping("/{quizId}/update")
    public ResponseEntity<Object> updateQuestionsAndAnswers(@PathVariable("quizId") Long quizId, @RequestBody List<Question> updatedQuestions) {
        Quiz quiz = questionService.updateQuestionsAndAnswers(quizId, updatedQuestions);
        if (quiz != null) {
            return ResponseEntity.ok().body("Questions and answers updated successfully for quiz with ID " + quizId);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        try {
            questionService.deleteQuestionAndAnswers(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete question: " + e.getMessage());
        }
    }

}
