package org.dolymy.quiz.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.quiz.entities.Question;
import org.dolymy.quiz.entities.Quiz;
import org.dolymy.quiz.entities.Answer;
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

    private final QuestionService questionService;


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

    //update the quiz + questions and its answers
    @Transactional
    public ResponseEntity<?> updateQuiz(String id, Quiz updatedQuiz) {
        // Vérifiez si le quiz avec l'ID donné existe
        Optional<Quiz> optionalQuiz = quizrepo.findById(id);
        if (optionalQuiz.isPresent()) {
            Quiz existingQuiz = optionalQuiz.get();

            // Mettre à jour les champs du quiz existant avec les nouvelles données
            existingQuiz.setQuizName(updatedQuiz.getQuizName());
            existingQuiz.setQuizTime(updatedQuiz.getQuizTime());
            //existingQuiz.setCorrect(updatedQuiz.isCorrect());

            // Enregistrer le quiz mis à jour
            Quiz savedQuiz = quizrepo.save(existingQuiz);

            // Récupérer toutes les questions associées à ce quiz
            List<Question> updatedQuestions = updatedQuiz.getQuestions();
            List<Question> existingQuestions = existingQuiz.getQuestions();

            // Parcourir toutes les questions pour les mettre à jour
            for (int i = 0; i < existingQuestions.size(); i++) {
                Question existingQuestion = existingQuestions.get(i);
                Question updatedQuestion = updatedQuestions.get(i);

                // Mettre à jour le texte de la question
                existingQuestion.setQuestiontxt(updatedQuestion.getQuestiontxt());

                // Mettre à jour les réponses de la question
                List<Answer> updatedAnswers = updatedQuestion.getAnswers();
                List<Answer> existingAnswers = existingQuestion.getAnswers();

                // Effacer les réponses existantes et ajouter les nouvelles
                existingAnswers.clear();
                existingAnswers.addAll(updatedAnswers);

                // Enregistrer les réponses mises à jour
                updatedAnswers.forEach(answer -> answerRepository.save(answer));

                // Enregistrer la question mise à jour avec ses réponses
                questionRepo.save(existingQuestion);
            }

            // Retourner le quiz mis à jour avec un statut 200 OK
            return ResponseEntity.ok(savedQuiz);
        } else {
            // Retourner une réponse non trouvée si le quiz n'est pas trouvé
            return ResponseEntity.notFound().build();
        }
    }


    //this method is implemented to delete the quiz
    @Transactional
    public void deleteQuiz(String quizId) {


            // Delete the quiz
            quizrepo.deleteById(quizId);

        }



}
