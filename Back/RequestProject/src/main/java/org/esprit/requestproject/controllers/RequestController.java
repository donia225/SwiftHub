package org.esprit.requestproject.controllers;

import org.esprit.requestproject.entities.Category;
import org.esprit.requestproject.entities.Request;
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
    public ResponseEntity<Request> getRequestById(@PathVariable("id") String id) {
        Request request = requestService.getRequestById(id);
        if (request != null) {
            return new ResponseEntity<>(request, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/add-request")
    public ResponseEntity<String> createRequest(@RequestBody Request request) {
        try {
            this.requestService.createRequest(request);
            return new ResponseEntity<>("Demande ajoutée avec succès", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    //affecterCategoryToRequest
    @PostMapping("/{idCategory}")
    public ResponseEntity<Request> addCategoryToRequest(@PathVariable("idCategory") String idCategory, @RequestBody Request request) {
        Request createdRequest = requestService.addRequestToCategory(idCategory, request);
        if (createdRequest != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRequest);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



    @PutMapping("/update/{id}")
    public ResponseEntity<Request> updateRequest(@PathVariable String id, @RequestBody Request request) {
        Request updatedRequest = requestService.updateRequest(id, request);
        if (updatedRequest != null) {
            return new ResponseEntity<>(updatedRequest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable("id") String id) {
        try {
            requestService.deleteRequest(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(IllegalArgumentException d){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}

