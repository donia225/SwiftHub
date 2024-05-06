package org.esprit.requestproject.controllers;

import org.esprit.requestproject.entities.Category;
import org.esprit.requestproject.entities.Request;
import org.esprit.requestproject.entities.Status;
import org.esprit.requestproject.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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
    public ResponseEntity<Request> addRequest(@RequestBody Request request) {
        request.setCreationDate(new Date()); // Définir manuellement pour tester
        Request savedRequest = requestService.createRequest(request);
        return ResponseEntity.ok(savedRequest);
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

    // Endpoint pour rechercher des requests par texte
    @GetMapping("/search")
    public ResponseEntity<List<Request>> searchRequests(@RequestParam String searchText) {
        List<Request> requests = requestService.searchRequests(searchText);
        if (requests.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(requests);
    }



}

