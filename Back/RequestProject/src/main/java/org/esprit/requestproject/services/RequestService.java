package org.esprit.requestproject.services;

import org.esprit.requestproject.entities.Category;
import org.esprit.requestproject.entities.Request;

import org.esprit.requestproject.repositories.CategoryRepo;
import org.esprit.requestproject.repositories.RequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Transient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RequestService {
    private final SequenceGeneratorService sequenceGenerator;

    @Autowired
    private RequestRepo requestRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    public RequestService(SequenceGeneratorService sequenceGenerator) {
        this.sequenceGenerator = sequenceGenerator;
    }


    public List<Request> getAllRequests() {
        return requestRepo.findAll();
    }

    public Request getRequestById(Long id) {
        Optional<Request> optionalRequest = requestRepo.findById(id);
        if (optionalRequest.isPresent()) {
            Request request = optionalRequest.get();
            Category category = request.getCategory();
            String categoryName = category != null ? category.getCategoryName() : null;

            return request;
        } else {
            System.err.println("Erreur : Aucune demande trouvée pour l'ID " + id);
            return null;
        }
    }

    public Request createRequest(Request request) {
        request.setIdRequest(sequenceGenerator.generateSequence(Request.SEQUENCE_NAME));
        return this.requestRepo.save(request);

    }



    public Request affectRequestionToCateg(Long idCategory, Request request) {
        Optional<Category> optionalCategory = categoryRepo.findById(idCategory);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            request.setCategory(category);

            request.setIdRequest(sequenceGenerator.generateSequence(Request.SEQUENCE_NAME));
            category.getRequests().add(request);

            //request.getAnswers().forEach(answer -> answerRepository.save(answer));


            categoryRepo.save(category);


            return requestRepo.save(request);
        }
        return null;
    }

    @Transactional
    public Request updateRequest(Long id, Request request) {

        Optional<Request> existingRequestOptional = this.requestRepo.findById(id);

        if (existingRequestOptional.isPresent()) {
            Request existingRequest = existingRequestOptional.get();


            if (request != null) {
                // Mettre à jour les champs de la demande
                existingRequest.setTitle(request.getTitle());
                existingRequest.setDescription(request.getDescription());
                existingRequest.setAttachment(request.getAttachment());
                existingRequest.setVisibility(true);

                // Vérifier si la catégorie associée à la demande existante est null
                if (existingRequest.getCategory() == null) {
                    existingRequest.setCategory(new Category()); // Créer une nouvelle catégorie si elle est null
                }

                // Mettre à jour l'ID de la catégorie associée à la demande
                existingRequest.getCategory().setIdCategory(request.getCategory().getIdCategory());

                request.setIdRequest(sequenceGenerator.generateSequence(Request.SEQUENCE_NAME));
                return this.requestRepo.save(existingRequest);
            } else {
                System.err.println("Erreur : La demande envoyée est nulle");
            }
        } else {
            System.err.println("Erreur : Aucune demande trouvée pour l'ID " + id);
        }

        return null;
    }


    public void deleteRequest(Long id) {
        requestRepo.deleteById(id);

    }
}
