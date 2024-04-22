package org.dolymy.quiz.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.quiz.entities.Answer;
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
    //log messages
    private static final String ERROR_NULL_ID = "ID is NULL";
    private static final String ERROR_NON_PRESENT_ID = " cannot find object with id : %s";

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;
    private final AnswerRepository answerRepository;


    // a simple method to add a question
    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    // get all the questions
    public List<Question> getAllQuestions() {
        return this.questionRepository.findAll();
    }

    //find question by id
    public Question findQuestionById(String id) {
        Question q = null;
        if (id != null) {
            final Optional<Question> questionOptional = this.questionRepository.findById(id);
            if (questionOptional.isPresent()) {
                q = questionOptional.get();
            } else {
                LOG.error(ERROR_NON_PRESENT_ID);
            }
        } else {
            LOG.error(ERROR_NULL_ID);
        }


        return q;


    }


    //add the question + the answers and assign them to quiz
    public Question affectQuestionToQuiz(String quizId, Question question) {
        Optional<Quiz> optionalQuiz = quizRepository.findById(quizId);
        if (optionalQuiz.isPresent()) {
            Quiz quiz = optionalQuiz.get();
            question.setQuiz(quiz); // here we set the quiz for the question

            // we update the list of questions in the quiz
            quiz.getQuestions().add(question);

            // we save the question along with its associated answers
            question.getAnswers().forEach(answer -> answerRepository.save(answer));

            // we save the updated quiz with the new question added
            quizRepository.save(quiz);

            // finally we save and return the question + answers + id of the quiz
            return questionRepository.save(question);
        }
        return null;
    }


    //this method is dedicated to update a question and its answers
    @Transactional
    public ResponseEntity<?> updateQuestion(String id, Question updatedQuestion) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question existingQuestion = optionalQuestion.get();

            // Update the attribute questiontxt
            existingQuestion.setQuestiontxt(updatedQuestion.getQuestiontxt());

            // Update answers
            List<Answer> updatedAnswers = updatedQuestion.getAnswers();
            List<Answer> existingAnswers = existingQuestion.getAnswers();

            // Clear existing answers and add updated ones
            existingAnswers.clear();
            existingAnswers.addAll(updatedAnswers);

            // Save updated question along with its answers
            Question savedQuestion = questionRepository.save(existingQuestion);

            // Save updated answers
            updatedAnswers.forEach(answer -> answerRepository.save(answer));

            return ResponseEntity.ok(savedQuestion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //this method is implemented to delete the question and its answers

    @Transactional
    public void deleteQuestionAndAnswers(String questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            List<Answer> answers = question.getAnswers();

            // Supprimer toutes les réponses associées à cette question
            answerRepository.deleteAll(answers);

            // Supprimer la référence de la question dans le quiz
            Quiz quiz = question.getQuiz();
            if (quiz != null) {
                quiz.getQuestions().remove(question);
                quizRepository.save(quiz);
            }

            // Supprimer la question elle-même
            questionRepository.deleteById(questionId);
        } else {
            LOG.error(String.format(ERROR_NON_PRESENT_ID, questionId));
        }
    }




}
