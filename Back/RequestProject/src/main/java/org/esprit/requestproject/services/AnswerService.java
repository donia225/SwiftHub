package org.esprit.requestproject.services;

import lombok.RequiredArgsConstructor;
import org.esprit.requestproject.entities.Answer;
import org.esprit.requestproject.entities.Request;
import org.esprit.requestproject.repositories.AnswerRepo;
import org.esprit.requestproject.repositories.RequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final SequenceGeneratorService sequenceGenerator;
    @Autowired
    private AnswerRepo answerRepo;
    @Autowired
    private RequestRepo requestRepo;

    public List<Answer> getAllAnswers(){
        return answerRepo.findAll();
    }



    public Answer getAnswerById(Long id) {
        Optional<Answer> optionalAnswer = answerRepo.findById(id);
        if (optionalAnswer.isPresent()) {
            Answer answer = optionalAnswer.get();
            //Request request = answer.getRequest();


            return answer;
        } else {
            System.err.println("Erreur : Aucune demande trouvée pour l'ID " + id);
            return null;
        }
    }



    public Answer CreateAnswer(Answer answer){
        answer.setId(sequenceGenerator.generateSequence(Answer.SEQUENCE_NAME));
        if (answer.getResponseDate() == null) {
            answer.setResponseDate(new Date());
        }
        return this.answerRepo.save(answer);

    }

   /* public Answer updateAnswer(String id, Answer updatedAnswer) {
        // Vérifie si la réponse existe dans la base de données
        Optional<Answer> existingAnswerOptional = this.answerRepo.findById(id);

        if (existingAnswerOptional.isPresent()) {
            // Si la réponse existe, met à jour ses valeurs avec celles de la réponse mise à jour
            Answer existingAnswer = existingAnswerOptional.get();
            existingAnswer.setResponseText(updatedAnswer.getResponseText());
            existingAnswer.setResponseDate(updatedAnswer.getResponseDate());
            existingAnswer.setAttachment(updatedAnswer.getAttachment());
            existingAnswer.setRequest(updatedAnswer.getRequest());

            // Enregistre la réponse mise à jour dans la base de données
            return this.answerRepo.save(existingAnswer);
        } else {
            // Si la réponse n'existe pas, retourne null ou lance une exception selon votre logique
            return null;
        }
    }*/

    @Transactional
    public Answer updateAnswer(Long id, Answer answer) {
        Optional<Answer> existingAnswerOptional = this.answerRepo.findById(id);

        if (existingAnswerOptional.isPresent()) {
            Answer existingAnswer = existingAnswerOptional.get();

            if (answer != null) {
                existingAnswer.setResponseText(answer.getResponseText());
                existingAnswer.setResponseDate(answer.getResponseDate());
                answer.setId(sequenceGenerator.generateSequence(Answer.SEQUENCE_NAME));
                return this.answerRepo.save(existingAnswer);
            } else {
                System.err.println("Erreur : La réponse envoyée est nulle");
                return null;
            }
        } else {
            System.err.println("Erreur : Aucune réponse trouvée pour l'ID " + id);
            return null;
        }
    }

    @Transactional
    public Answer affectAnswerToreq(Long idRequest, Answer answer) {
        Optional<Request> optionalRequest = requestRepo.findById(idRequest);
        if (optionalRequest.isPresent()) {
            Request request = optionalRequest.get();
            answer.setRequest(request);

            answer.setId(sequenceGenerator.generateSequence(Answer.SEQUENCE_NAME));
            request.getAnswers().add(answer);

            //request.getAnswers().forEach(answer -> answerRepository.save(answer));


            requestRepo.save(request);


            return answerRepo.save(answer);
        }
        return null;
    }




    public void deleteAnswer(Long id) {
        answerRepo.deleteById(id);
    }
}
