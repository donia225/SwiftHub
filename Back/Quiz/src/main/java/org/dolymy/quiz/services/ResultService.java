package org.dolymy.quiz.services;

import org.dolymy.quiz.DTO.ResultDTO;
import org.dolymy.quiz.entities.Answer;

import org.dolymy.quiz.entities.Question;
import org.dolymy.quiz.entities.Quiz;

import org.dolymy.quiz.entities.Result;
import org.dolymy.quiz.repos.QuizRepository;
import org.dolymy.quiz.repos.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




import java.util.List;
import java.util.Optional;


@Service
public class ResultService {

    @Autowired
    private QuizService quizService;



    private final QuizRepository quizRepository;
    private final ResultRepository resultRepository;

    public ResultService(QuizRepository quizRepository, ResultRepository resultRepository) {
        this.quizRepository = quizRepository;

        this.resultRepository = resultRepository;
    }


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

    public void saveResult(ResultDTO resultDTO) {
        Result result = new Result();

        // Fetch the Quiz entity from the database using the quizId from the DTO
        Optional<Quiz> optionalQuiz = quizRepository.findById(resultDTO.getQuizId());

        // Check if the Quiz entity exists
        if (optionalQuiz.isPresent()) {
            Quiz quiz = optionalQuiz.get();

            // Map data from DTO to entity
            result.setQuiz(quiz);
            result.setScore(resultDTO.getScore());
            result.setStudentId(resultDTO.getStudentId());

            // Save the result to the database
            resultRepository.save(result);
        } else {
            // Handle the case where the Quiz entity does not exist for the given quizId
            System.out.println("Quiz not found for id: " + resultDTO.getQuizId());
        }
    }


}