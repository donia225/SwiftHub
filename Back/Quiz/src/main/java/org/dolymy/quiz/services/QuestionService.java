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
public class QuestionService {
    private static final Logger LOG = LoggerFactory.getLogger(QuestionService.class);
    private static final String ERROR_NULL_ID = "ID is NULL";
    private static final String ERROR_NON_PRESENT_ID = " cannot find object with id : %s";

    private final QuestionRepository questionRepository;
    private  final QuizRepository quizRepository;
    private  final AnswerRepository answerRepository;


    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    public List<Question> getAllQuestions() {
        return this.questionRepository.findAll();
    }
    public Question findQuestionById(String id) {
        Question q = null;
        if (id != null) {
            final Optional<Question> questionOptional = this.questionRepository.findById(id);
            if (questionOptional .isPresent()) {
                q = questionOptional.get();
            } else {
                LOG.error(ERROR_NON_PRESENT_ID);
            }
        } else {
            LOG.error(ERROR_NULL_ID);
        }


        return q;


    }
    //add the question to quiz
    public Question affectQuestionToQuiz(String quizId, Question question) {
        Optional<Quiz> optionalQuiz = quizRepository.findById(quizId);
        if (optionalQuiz.isPresent()) {
            Quiz quiz = optionalQuiz.get();
            question.setQuiz(quiz); // Set the quiz for the question

            // Update the list of questions in the quiz
            quiz.getQuestions().add(question);

            // Save the question along with its associated answers
            question.getAnswers().forEach(answer -> answerRepository.save(answer));

            // Save the updated quiz (with the new question added)
            quizRepository.save(quiz);

            // Finally, save and return the question
            return questionRepository.save(question);
        }
        return null;
    }




    @Transactional
    public ResponseEntity<?> updateQuestion(String id, Question updatedQuestion) {

        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question existingQuestion= optionalQuestion.get();


            existingQuestion.setQuestiontxt(updatedQuestion.getQuestiontxt());



            Question savedQuestion = questionRepository.save(existingQuestion);


            return ResponseEntity.ok(savedQuestion);

        } else {


            return ResponseEntity.notFound().build();

        }
    }



}
