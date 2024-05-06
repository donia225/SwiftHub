package org.dolymy.quiz.services;

import org.dolymy.quiz.entities.Answer;

import org.dolymy.quiz.entities.Question;
import org.dolymy.quiz.entities.Quiz;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class ResultService {

    @Autowired
    private QuizService quizService;

    @Autowired
    private AnswerService answerService;


    public double calculateScoreByQuizId(Long quizId) {
        // Step 1: Get the quiz
        Quiz quiz = quizService.findQuizById(quizId);

        if (quiz == null) {
            throw new IllegalArgumentException("Quiz not found for id: " + quizId);
        }

        // Step 2: Get questions associated with the quiz
        List<Question> questions = quiz.getQuestions();

        // Step 3: Calculate total score
        double totalScore = 0;
        for (Question question : questions) {
            // Step 3.1: Get answers for each question
            List<Answer> answers = question.getAnswers();

            // Step 3.2: Calculate points for correct answers
            for (Answer answer : answers) {
                if (answer.isCorrectAnswer()) {
                    totalScore += answer.getPoint();
                }
            }
        }

        return totalScore;
    }
}



