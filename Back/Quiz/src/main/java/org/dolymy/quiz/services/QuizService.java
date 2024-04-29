package org.dolymy.quiz.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.quiz.entities.Question;
import org.dolymy.quiz.entities.Quiz;
import org.dolymy.quiz.entities.Answer;
import org.dolymy.quiz.repos.AnswerRepository;
import org.dolymy.quiz.repos.QuestionRepository;
import org.dolymy.quiz.repos.QuizRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

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

    private final QuestionService questionService;
    private final SequenceGeneratorService sequenceGenerator;


    public Quiz addQuiz(Quiz quiz) {
        quiz.setQuizId(sequenceGenerator.generateSequence(Quiz.SEQUENCE_NAME));
        return this.quizrepo.save(quiz);
    }


    //add a question to the quiz


    public List<Quiz> getAllQuizzes() {
        return this.quizrepo.findAll();
    }

    public Quiz findQuizById(Long id) {
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

    //this method will update the quiz and the questions
    @Transactional
    public ResponseEntity<?> updateQuiz(Long id, Quiz updatedQuiz) {
        // Check if the quiz with the given ID exists
        Optional<Quiz> optionalQuiz = quizrepo.findById(id);
        if (optionalQuiz.isPresent()) {
            Quiz existingQuiz = optionalQuiz.get();

            // Update the quiz name and time
            existingQuiz.setQuizName(updatedQuiz.getQuizName());
            existingQuiz.setQuizTime(updatedQuiz.getQuizTime());

            // Update questions (logic assuming Question is a separate entity)
            ArrayList<Question> updatedQuestions = (ArrayList<Question>) updatedQuiz.getQuestions();

            // Clear existing questions before updating (optional)
            existingQuiz.getQuestions().clear(); // Optional step if you don't want duplicates

            for (Question updatedQuestion : updatedQuestions) {
                try {
                    // Save the updated question (handles create/update in question database)
                    Question savedQuestion = updateOrCreateQuestion(updatedQuestion);

                    // Update the questions collection in existingQuiz
                    existingQuiz.getQuestions().add(savedQuestion);
                } catch (DataAccessException e) {
                    // Handle data access exceptions (e.g., database errors)
                    System.out.println("Error updating question: " + e.getMessage());
                    throw new RuntimeException("Error updating quiz", e); // Re-throw for controller handling
                } catch (Exception e) {
                    // Handle other unexpected exceptions
                    System.out.println("Unexpected error updating question: " + e.getMessage());
                    throw new RuntimeException("Error updating quiz", e); // Re-throw for controller handling
                }
            }

            // **Update answers within questions (Choose one approach):**

            // **Approach 1: Update existing Answers directly**
            for (Question question : existingQuiz.getQuestions()) {
                List<Answer> updatedAnswers = question.getAnswers();
                for (Answer existingAnswer : updatedAnswers) {
                    try {
                        // Find the corresponding updated answer from the request based on ID
                        Answer updatedAnswer = findMatchingUpdatedAnswer(existingAnswer.getAnswer_id(), updatedQuiz);

                        if (updatedAnswer != null) {
                            existingAnswer.setAnswerTxt(updatedAnswer.getAnswerTxt()); // Update answer text (or other fields)

                            // Handle potential error during saving the updated answer
                            Optional<Answer> savedOptionalAnswer = Optional.of(answerRepository.save(existingAnswer));
                            if (!savedOptionalAnswer.isPresent()) {
                                System.out.println("Error saving updated answer for question " + question.getId());
                                // Consider throwing a specific exception or logging the error for further handling
                            }
                        } else {
                            System.out.println("No matching updated answer found for existing answer with ID: " + existingAnswer.getAnswer_id());
                            // Consider handling the case where no matching updated answer is found (e.g., log the issue)
                        }
                    } catch (Exception e) {
                        System.out.println("Error updating answer for question " + question.getId() + ": " + e.getMessage());
                        // Consider throwing a specific exception or logging the error for further handling
                    }
                }
            }

            // Save the updated quiz with updated questions and answers
            Quiz savedQuiz = quizrepo.save(existingQuiz);

            // Return the updated quiz with a 200 OK status
            return ResponseEntity.ok(savedQuiz);

        } else {
            // Return a not found response if the quiz is not found

            return ResponseEntity.notFound().build();

        }
    }

    // Helper methods for updating/creating questions and answers (implementation details depend on your persistence layer)
    private Question updateOrCreateQuestion(Question question) {
        // Check if question exists in question database based on ID (logic specific to JPA)
        Optional<Question> existingQuestionOptional = questionRepo.findById(question.getId());
        if (existingQuestionOptional.isPresent()) {
            Question existingQuestion = existingQuestionOptional.get();
            existingQuestion.setQuestiontxt(question.getQuestiontxt());
            return questionRepo.save(existingQuestion);
        } else {
            // Create a new question in the question database
            return questionRepo.save(question);
        }
    }
    private Answer findMatchingUpdatedAnswer(Long existingAnswerId, Quiz updatedQuiz) {
        if (existingAnswerId != null) {
            for (Question updatedQuestion : updatedQuiz.getQuestions()) {
                // Vérifie si la question contient l'identifiant de réponse existant
                if (updatedQuestion.getAnswers().stream().anyMatch(answer -> Objects.equals(answer.getAnswer_id(), existingAnswerId))) {
                    // Recherche de la réponse mise à jour correspondante
                    for (Answer updatedAnswer : updatedQuestion.getAnswers()) {
                        if (Objects.equals(updatedAnswer.getAnswer_id(), existingAnswerId)) {
                            return updatedAnswer;
                        }
                    }
                }
            }
        }
        // Si aucune réponse correspondante n'est trouvée ou si existingAnswerId est nul, enregistrez l'erreur et retournez null
        System.out.println("Aucune réponse mise à jour correspondante trouvée pour l'identifiant de réponse existant : " + existingAnswerId);
        return null;
    }






    //this method is implemented to delete the quiz
    @Transactional
    public void deleteQuiz(Long quizId) {


            // Delete the quiz
            quizrepo.deleteById(quizId);

        }



}
