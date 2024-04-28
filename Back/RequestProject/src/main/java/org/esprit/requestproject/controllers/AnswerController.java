package org.esprit.requestproject.controllers;

import org.esprit.requestproject.entities.Answer;
import org.esprit.requestproject.entities.Category;
import org.esprit.requestproject.entities.Request;
import org.esprit.requestproject.services.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/request/answers")
public class AnswerController {
    @Autowired
    private AnswerService answerService;


    @GetMapping
    public ResponseEntity<List<Answer>> getAllAnswers() {
        List<Answer> answers = answerService.getAllAnswers();
        return new ResponseEntity<>(answers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Answer> getAnswerById(@PathVariable("id") Long id) {
        Answer answer = answerService.getAnswerById(id);
        if (answer != null) {
            return new ResponseEntity<>(answer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @PostMapping("/add-answer")
   public Answer createAnswer(@RequestBody Answer answer) {

           return this.answerService.CreateAnswer(answer);

   }


    @PutMapping("/update/{id}")
    public ResponseEntity<Answer> updateAnswer(@PathVariable Long id, @RequestBody Answer answer) {
        // Appel de la méthode updateAnswer du service pour mettre à jour la réponse
        Answer updatedAnswerResult = answerService.updateAnswer(id, answer);;

        // Vérification si la réponse a été mise à jour avec succès
        if (updatedAnswerResult != null) {
            // Retourne la réponse mise à jour avec le statut OK
            return new ResponseEntity<>(updatedAnswerResult, HttpStatus.OK);
        } else {
            // Si la réponse n'a pas été trouvée, retourne un statut NOT_FOUND
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable("id") Long id) {
        try {
            answerService.deleteAnswer(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(IllegalArgumentException d){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
