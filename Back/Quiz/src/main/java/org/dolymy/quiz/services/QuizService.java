package org.dolymy.quiz.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.quiz.entities.Question;
import org.dolymy.quiz.entities.Quiz;
import org.dolymy.quiz.repos.AnswerRepository;
import org.dolymy.quiz.repos.QuestionRepository;
import org.dolymy.quiz.repos.QuizRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor

public class QuizService {
    private static final Logger LOG = LoggerFactory.getLogger(QuizService.class);
    private static final String ERROR_NULL_ID = "ID is NULL";
    private static final String ERROR_NON_PRESENT_ID = " cannot find object with id : %s";


    private final QuizRepository quizrepo;
    private final QuestionRepository questionRepo;
    private final AnswerRepository answerRepository;


    public Quiz addQuiz(Quiz quiz) {
        return this.quizrepo.save(quiz);
    }


    //add a question to the quiz


    public List<Quiz> getAllQuizzes() {
        return this.quizrepo.findAll();
    }
    public Quiz findQuizById(String id) {
        Quiz quiz = null;
        if (id != null) {
            final Optional<Quiz> quizOptional = this.quizrepo.findById(id);
            if (quizOptional.isPresent()) {
                quiz = quizOptional.get();
            } else {
                LOG.error(ERROR_NON_PRESENT_ID);
            }
        } else {
            LOG.error(ERROR_NULL_ID);
        }


        return quiz;


    }

    @Transactional
    public ResponseEntity<?> updateQuiz(String id, Quiz updatedQuiz) {
        // Check if the quiz with the given ID exists
        Optional<Quiz> optionalQuiz = quizrepo.findById(id);
        if (optionalQuiz.isPresent()) {
            Quiz existingQuiz = optionalQuiz.get();

            // Update the fields of the existing quiz with the new data
            existingQuiz.setQuizName(updatedQuiz.getQuizName());
            existingQuiz.setGrade(updatedQuiz.getGrade());
            existingQuiz.setCorrect(updatedQuiz.isCorrect());

            // Save the updated quiz
            Quiz savedQuiz = quizrepo.save(existingQuiz);

            // Return the updated quiz with a 200 OK status
            return ResponseEntity.ok(savedQuiz);

        } else {
            // Return a not found response if the quiz is not found

            return ResponseEntity.notFound().build();

        }
    }

    @Transactional
    public void deleteQuiz(String id) {
        if (id != null) {
            Optional<Quiz> optionalQuiz = this.quizrepo.findById(id);
            if (optionalQuiz.isPresent()) {
                Quiz quiz = optionalQuiz.get();

                // Delete associated answers first
                quiz.getQuestions().forEach(question -> {
                    question.getAnswers().forEach(answerRepository::delete);
                });

                // Then delete associated questions
                quiz.getQuestions().forEach(questionRepo::delete);

                // Finally, delete the quiz itself
                this.quizrepo.deleteById(id);
            } else {
                LOG.error(ERROR_NON_PRESENT_ID, id);
            }
        } else {
            LOG.error(ERROR_NULL_ID);
        }
    }


}
