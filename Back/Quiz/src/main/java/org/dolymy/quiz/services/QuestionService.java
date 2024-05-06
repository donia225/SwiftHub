package org.dolymy.quiz.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.quiz.entities.Answer;
import org.dolymy.quiz.entities.Question;

import org.dolymy.quiz.entities.Quiz;
import org.dolymy.quiz.repos.AnswerRepository;
import org.dolymy.quiz.repos.QuestionRepository;

import org.dolymy.quiz.repos.QuizRepository;

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
    private final SequenceGeneratorService sequenceGenerator;


    // a simple method to add a question


    // get all the questions
    public List<Question> getAllQuestions() {
        return this.questionRepository.findAll();
    }

    //find question by id
    public Question findQuestionById(Long id) {
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
    public Question affectQuestionToQuiz(Long id, Question question) {
        Optional<Quiz> optionalQuiz = quizRepository.findById(id);

        if (optionalQuiz.isPresent()) {
            Quiz quiz = optionalQuiz.get();
            question.setQuiz(quiz); // here we set the quiz for the question
            question.setId(sequenceGenerator.generateSequence(Question.SEQUENCE_NAME));
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

    @Transactional
    public Quiz updateQuestionsAndAnswers(Long quizId, List<Question> updatedQuestions) {
        Optional<Quiz> optionalQuiz = quizRepository.findById(quizId);
        if (optionalQuiz.isPresent()) {
            Quiz quiz = optionalQuiz.get();
            for (Question updatedQuestion : updatedQuestions) {
                Optional<Question> optionalExistingQuestion = questionRepository.findById(updatedQuestion.getId());
                if (optionalExistingQuestion.isPresent()) {
                    Question existingQuestion = optionalExistingQuestion.get();
                    // Update question details
                    existingQuestion.setQuestiontxt(updatedQuestion.getQuestiontxt());
                    existingQuestion.setQuiz(quiz);

                    // Update each answer in the question
                    for (Answer updatedAnswer : updatedQuestion.getAnswers()) {
                        // Check if the answer exists
                        Optional<Answer> optionalExistingAnswer = answerRepository.findById(updatedAnswer.getAnswer_id());
                        if (optionalExistingAnswer.isPresent()) {
                            Answer existingAnswer = optionalExistingAnswer.get();
                            // Update answer details
                            existingAnswer.setAnswerTxt(updatedAnswer.getAnswerTxt());
                            existingAnswer.setCorrectAnswer(updatedAnswer.isCorrectAnswer());
                            existingAnswer.setPoint(updatedAnswer.getPoint());
                            // Save the updated answer
                            answerRepository.save(existingAnswer);
                        } else {
                            LOG.error("Answer with ID " + updatedAnswer.getAnswer_id() + " not found.");
                        }
                    }
                    // Save the updated question
                    questionRepository.save(existingQuestion);
                } else {
                    LOG.error("Question with ID " + updatedQuestion.getId() + " not found.");
                }
            }
            // Save the updated quiz
            return quizRepository.save(quiz);
        } else {
            LOG.error(String.format(ERROR_NON_PRESENT_ID, quizId));
            return null;
        }
    }





    @Transactional
    public void deleteQuestionAndAnswers(Long id) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            List<Answer> answers = question.getAnswers();
            // Delete associated answers
            answerRepository.deleteAll(answers);

            // Remove the question from the associated quiz
            Quiz quiz = question.getQuiz();
            if (quiz != null) {
                quiz.getQuestions().remove(question);
                quizRepository.save(quiz);
            }

            // Delete the question itself
            questionRepository.deleteById(id);
        } else {
            LOG.error(String.format(ERROR_NON_PRESENT_ID, id));
        }
    }


}
