package org.dolymy.workshop.controllers;

import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Feedback;
import org.dolymy.workshop.services.FeedbackService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workshop/feedbacks")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    /**
     * creates a new feedback
     * @param feedback a feedback entity
     * @return the created feedback entity
     */
    @PostMapping
    public Feedback addFeedback(@RequestBody Feedback feedback){
        return this.feedbackService.saveFeedback(feedback);
    }

    /**
     * Retrieve all feedbacks.
     * @return a List of feedbacks
     */
    @GetMapping
    public List<Feedback> getAllFeedbacks(){
        return this.feedbackService.findFeedbacks();
    }

    /**
     * Retrieve a feedback by ID.
     * @param id ID of the feedback to retrieve.
     * @return The feedback if found, otherwise an empty Optional.
     */
    @GetMapping("/{id}")
    public Feedback getFeedbackById(@PathVariable String id){
        return this.feedbackService.findFeedbackById(id);
    }

    /**
     * Update an existing feedback.
     * @param id ID of the feedback to update.
     * @param updatedfeedback The updated feedback object.
     * @return The updated feedback if successful, otherwise null.
     */
    @PutMapping("/update/{id}")
    public Feedback updateFeedback(@PathVariable String id, @RequestBody Feedback updatedfeedback ){
        return this.feedbackService.updateFeedback(id,updatedfeedback);
    }

    /**
     * Delete a feedback by ID.
     * @param id ID of the feedback to delete.
     */
    @DeleteMapping("/delete/{id}")
    public void deleteFeedback(@PathVariable String id){
        this.feedbackService.deleteFeedback(id);
    }

}
