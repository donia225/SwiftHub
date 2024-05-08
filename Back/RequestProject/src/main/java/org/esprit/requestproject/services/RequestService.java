package org.esprit.requestproject.services;

import org.esprit.requestproject.entities.Request;

import org.esprit.requestproject.entities.Status;
import org.esprit.requestproject.repositories.RequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class RequestService {
    private final SequenceGeneratorService sequenceGenerator;

    @Autowired
    private RequestRepo requestRepo;



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





    @Transactional
    public Request updateRequest(Long id, Request request) {

        Optional<Request> existingRequestOptional = this.requestRepo.findById(id);

        if (existingRequestOptional.isPresent()) {
            Request existingRequest = existingRequestOptional.get();


            if (request != null) {
                // Mettre à jour les champs de la demande
                existingRequest.setTitle(request.getTitle());
                existingRequest.setDescription(request.getDescription());
                existingRequest.setStatus(request.getStatus());
                existingRequest.setCategoryName(request.getCategoryName());


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

    @Transactional
    public Request updateRequestStatus(Long id, String newStatus) {
        return requestRepo.findById(id).map(request -> {
            request.setStatus(Status.valueOf(newStatus)); // Ensure 'newStatus' is valid enum or handle exceptions
            return requestRepo.save(request);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Request not found with ID: " + id));
    }
    public void deleteRequest(Long id) {
        requestRepo.deleteById(id);

    }

    public List<Request> searchRequests(String searchText) {
        return requestRepo.findByText(searchText);
    }

}
