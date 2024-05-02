package org.dolymy.workshop.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Feedback;
import org.dolymy.workshop.entities.Workshop;
import org.dolymy.workshop.repositories.FeedbackRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackService {


    private final FeedbackRepository feedbackRepository;
    private final WorkshopService workshopService;
    private static final Logger LOG = LoggerFactory.getLogger(FeedbackService.class);
    private static final String ERROR_NULL_ID = "ID is NULL";
    private static final String EMPTY_FEEDBACK = "FEEDBACK DESCRIPTION EMPTY";
    private static final String ERROR_NON_PRESENT_WORKSHOP = "WORKSHOP_ID is NULL";
    private static final String ERROR_NON_PRESENT_ID = " cannot find object with id : %s";
    private static final String ERROR_UPDATE = "Error occurred while updating";

    /**
     * Saves a new feedback and associates it with the corresponding workshop.
     *
     * @param feedback The feedback to be saved.
     * @return The saved feedback if it meets the requirements, or a default feedback with "NULL" description if the provided feedback is empty or null.
     */
    public Feedback saveFeedback(Feedback feedback) {
        //Only accepts feedback without empty description
        if (!feedback.getDescription().isEmpty()) {
            //saving feedback
            feedback.setCreationDate(LocalDateTime.now());
            Feedback createdFeedback = this.feedbackRepository.save(feedback);
            String workshop_id = createdFeedback.getWorkshop().getWorkshop_id();
            if (workshop_id != null) {
                //retrieves workshop corresponding to feedback
                Workshop workshop = this.workshopService.findWorkshopById(workshop_id);
                List<Feedback> feedbacks = workshop.getFeedbacks();
                // If the list of feedbacks is null, initialize it with a new ArrayList
                if (feedbacks == null) {
                    feedbacks = new ArrayList<>();
                    workshop.setFeedbacks(feedbacks);
                }
                // add feedback to arrayList and update workshop
                workshop.getFeedbacks().add(createdFeedback);
                this.workshopService.updateWorkshop(workshop.getWorkshop_id(), workshop);
            } else LOG.error(ERROR_NON_PRESENT_WORKSHOP);
            return feedback;
        } else LOG.error(EMPTY_FEEDBACK);

        return Feedback.builder().description("NULL").build();
    }

    public List<Feedback> findFeedbacks() {
        return this.feedbackRepository.findAll();
    }

    /**
     * Finds a feedback by its ID.
     *
     * @param id The ID of the feedback to find.
     * @return The found feedback if it exists, or null if the ID is null or if no feedback is found with the given ID.
     */
    public Feedback findFeedbackById(String id) {
        Feedback feedback = null;
        if (id != null) {
            final Optional<Feedback> optionalFeedback = this.feedbackRepository.findById(id);
            if (optionalFeedback.isPresent()) {
                feedback = optionalFeedback.get();
            } else {
                LOG.info(ERROR_NON_PRESENT_ID, id);
            }
        } else {
            LOG.error(ERROR_NULL_ID);
        }
        return feedback;
    }

    /**
     * Updates the details of an existing feedback with the provided ID and updating the corresponding workshop .
     *
     * @param id              The ID of the feedback to update.
     * @param updatedfeedback The updated feedback object containing the new details.
     * @return The updated feedback if successfully updated, or a placeholder feedback object with "NOT_FOUND" description if the ID is not found.
     */
    public Feedback updateFeedback(String id, Feedback updatedfeedback) {
        Optional<Feedback> existingFeedback = this.feedbackRepository.findById(id);

        if (existingFeedback.isPresent()) {
            if (updatedfeedback != null) {
                updatedfeedback.setFeedback_id(existingFeedback.get().getFeedback_id());
                //retreiving workshop corresponding to feedback
                Workshop workshop = this.workshopService.findWorkshopById(updatedfeedback.getWorkshop().getWorkshop_id());
                //updating feedback in workshop
                List<Feedback> feedbacks = workshop.getFeedbacks();
                workshop.setFeedbacks(feedbacks.stream()
                        .map(feedback ->
                                (feedback.getFeedback_id().equals(updatedfeedback.getFeedback_id())) ? updatedfeedback : feedback)
                        .collect(Collectors.toList())
                );
                //update workshop with the new list
                this.workshopService.updateWorkshop(workshop.getWorkshop_id(),workshop);
                //saving updated feedback
                return this.feedbackRepository.save(updatedfeedback);
            } else {
                LOG.error(ERROR_UPDATE);
            }
        } else {
            LOG.error(ERROR_NON_PRESENT_ID);
        }

        return Feedback.builder()
                .description("NOT_FOUND")
                .description("NOT_FOUND")
                .build();
    }

    /**
     * Deletes a feedback from the database and removes it from the corresponding workshop's list of feedbacks.
     * If the feedback is not found with the given ID, or if the ID is null, appropriate error logs are generated.
     * If the workshop associated with the deleted feedback is not found, an error log is generated.
     *
     * @param id The ID of the feedback to delete.
     */
    public void deleteFeedback(String id) {
        if (id != null) {
            // Retrieve the feedback to be deleted
            Optional<Feedback> deletedFeedback = this.feedbackRepository.findById(id);
            if (deletedFeedback.isPresent()) {
                //deleting feedback
                this.feedbackRepository.deleteById(id);
                //retrieves the workshop corresponding to the deleted feedback
                Workshop workshop = deletedFeedback.get().getWorkshop();
                if (workshop != null) {
                    List<Feedback> feedbacks = workshop.getFeedbacks();
                    if (feedbacks != null) {
                        //removing the feedback and updating the workshop feedbacks list
                        workshop.setFeedbacks(feedbacks.stream()
                                .filter(feedback -> !feedback.getFeedback_id().equals(id))
                                .collect(Collectors.toList())
                        );
                        this.workshopService.updateWorkshop(workshop.getWorkshop_id(), workshop);
                    }
                } else LOG.error(ERROR_NON_PRESENT_WORKSHOP);

            } else LOG.error(ERROR_NON_PRESENT_ID, id);
        } else LOG.error(ERROR_NULL_ID);
    }
}
