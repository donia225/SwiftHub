package org.esprit.requestproject.services;

import org.esprit.requestproject.entities.Category;
import org.esprit.requestproject.entities.Request;

import org.esprit.requestproject.repositories.CategoryRepo;
import org.esprit.requestproject.repositories.RequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RequestService {

    @Autowired
    private RequestRepo requestRepo;

    @Autowired
    private CategoryRepo categoryRepo;


    public List<Request> getAllRequests() {
        return requestRepo.findAll();
    }

    public Request getRequestById(String id) {

        Request request = null;
        if (id != null) {
            final Optional<Request> optionalRequest = this.requestRepo.findById(id);
            if (optionalRequest.isPresent()) {
                request = optionalRequest.get();
            } else {
                System.err.println("Erreur : Aucune demande trouvée pour l'identifiant " + id);
            }
        } else {
            System.err.println("Erreur : L'identifiant est nul");
        }
        return request;

    }

    public String createRequest(Request request) {
         requestRepo.save(request);
        return "Demande ajoutée avec succès";
    }

    public Request addRequestToCategory(String idCategory, Request request) {
        Optional<Category> optionalCategory = categoryRepo.findById(idCategory);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            request.setCategory(category);


            category.getRequests().add(request);




            categoryRepo.save(category);

            return requestRepo.save(request);
        }
        return null;
    }



    public Request updateRequest(String id, Request request) {
        Optional<Request> existingRequestOptional = this.requestRepo.findById(id);

        if (existingRequestOptional.isPresent()) {
            Request existingRequest = existingRequestOptional.get();

            if (request != null) {
                existingRequest.setTitle(request.getTitle());
                existingRequest.setDescription(request.getDescription());
                existingRequest.setAttachment(request.getAttachment());
                existingRequest.setVisibility(true);
                existingRequest.setCategory(request.getCategory());
                return this.requestRepo.save(existingRequest);
            } else {
                System.err.println("Erreur : La demande envoyée est nulle");
            }
        } else {
            System.err.println("Erreur : Aucune demande trouvée pour l'ID " + id);
        }

        return null;
    }
    public void deleteRequest(String id) {
         requestRepo.deleteById(id);

    }
}
