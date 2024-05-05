package org.esprit.requestproject.controllers;

import org.esprit.requestproject.entities.Category;
import org.esprit.requestproject.entities.Request;
import org.esprit.requestproject.entities.Status;
import org.esprit.requestproject.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/request/requests")
public class RequestController {


    @Autowired
    private RequestService requestService;




    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        List<Request> requests = requestService.getAllRequests();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable("id") Long id) {
        Request request = requestService.getRequestById(id);
        if (request != null) {
            return new ResponseEntity<>(request, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/add-request")
    public Request createRequest(@RequestBody Request request) {
        return this.requestService.createRequest(request);

    }


    @PostMapping("/addcateg")

    public ResponseEntity<Request> affectRequestionToCateg(@RequestBody Request request) {
        Category category = request.getCategory(); // Récupérer la catégorie depuis la requête
        if (category != null) {
            Request createdRequest = requestService.affectRequestionToCateg(category.getIdCategory(), request);
            if (createdRequest != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdRequest);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }



    @PutMapping("/update/{id}")
    public ResponseEntity<Request> updateRequest(@PathVariable Long id, @RequestBody Request request) {
        Request updatedRequest = requestService.updateRequest(id, request);
        if (updatedRequest != null) {
            return new ResponseEntity<>(updatedRequest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable("id") Long id) {
        try {
            requestService.deleteRequest(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(IllegalArgumentException d){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/search") // Endpoint pour la recherche avancée
    public ResponseEntity<List<Request>> advancedSearch(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "status", required = false) Status status) {

        // Appelez la méthode advancedSearch de votre service
        List<Request> result = requestService.advancedSearch(title, status);

        // Vérifiez si des résultats ont été trouvés
        if (!result.isEmpty()) {
            return new ResponseEntity<>(result, HttpStatus.OK); // Renvoyer les résultats avec le code de statut OK (200)
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Aucun résultat trouvé, renvoyer le code de statut NOT_FOUND (404)
        }
    }



}

