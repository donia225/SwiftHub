package org.dolymy.workshop.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Workshop;
import org.dolymy.workshop.repositories.FeedbackRepository;
import org.dolymy.workshop.repositories.WorkshopRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class WorkshopService {

    private static final Logger LOG = LoggerFactory.getLogger(WorkshopService.class);
    private static final String ERROR_NULL_ID = "ID is NULL";
    private static final String ERROR_NON_PRESENT_ID = " cannot find object with id : %s";
    private static final String ERROR_UPDATE = "Error occurred while updating";

    private final WorkshopRepository workshopRepository;
    private final FeedbackRepository feedbackRepository;


    public Workshop saveWorkshop(Workshop workshop) {
        return this.workshopRepository.save(workshop);
    }

    public List<Workshop> findWorkshops() {
        return this.workshopRepository.findAll();
    }

    /**
     * Retrieves a workshop by its ID.
     *
     * @param id The ID of the workshop to retrieve.
     * @return The workshop with the specified ID if found, or null if not found.
     */
    public Workshop findWorkshopById(String id) {
        Workshop workshop = null;
        if (id != null) {
            final Optional<Workshop> optionalWorkshop = this.workshopRepository.findById(id);
            if (optionalWorkshop.isPresent()) {
                workshop = optionalWorkshop.get();
            } else {
                LOG.info(ERROR_NON_PRESENT_ID, id);
            }
        } else {
            LOG.error(ERROR_NULL_ID);
        }


        return workshop;
    }

    /**
     * Updates an existing workshop with the provided ID.
     *
     * @param id              The ID of the workshop to update.
     * @param updatedWorkshop The updated workshop object.
     * @return The updated workshop if found, or a workshop object with title and description "NOT_FOUND" if the workshop with the specified ID is not found.
     */

    public Workshop updateWorkshop(String id, Workshop updatedWorkshop) {
        Optional<Workshop> existingWorkshop = this.workshopRepository.findById(id);

        if (existingWorkshop.isPresent()) {
            if (updatedWorkshop != null) {
                updatedWorkshop.setWorkshop_id(existingWorkshop.get().getWorkshop_id());
                return this.workshopRepository.save(updatedWorkshop);
            } else {
                LOG.error(ERROR_UPDATE);
            }
        } else {
            LOG.error(ERROR_NON_PRESENT_ID);
        }

        return Workshop.builder()
                .title("NOT_FOUND")
                .description("NOT_FOUND")
                .build();
    }

    /**
     * Deletes a workshop and its corresponding feedbacks.
     *
     * @param id The ID of the workshop to be deleted.
     */
    public void deleteWorkshop(String id) {
        if (id != null) {
            Optional<Workshop> workshop = this.workshopRepository.findById(id);
            if (workshop.isPresent()) {
                //delete workshop
                this.workshopRepository.deleteById(id);
                //delete feedbacks corresponding to this workshop
                if(workshop.get().getFeedbacks()!=null){
                    workshop.get().getFeedbacks().stream()
                            .forEach(feedbackRepository::delete);
                }


            } else LOG.error(ERROR_NON_PRESENT_ID, id);
        } else LOG.error(ERROR_NULL_ID);

    }

    public void JoinWorkshop(String workshopId, String userId) {
        Workshop workshop=new Workshop();
        Integer workshopCapacity=null;
        List<String>usersInWorkshop=new ArrayList<String>();
        if(workshopId!=null && userId!=null){
            Optional<Workshop> optionalWorkshop=this.workshopRepository.findById(workshopId);
            if (optionalWorkshop.isPresent())
            {
                workshop=optionalWorkshop.get();
                workshopCapacity=workshop.getCapacity();
                if (workshopCapacity>0){
                    // reducing workshop capacity
                    workshop.setCapacity(workshop.getCapacity()-1);
                    //add the newly joined user
                    if(workshop.getJoinedUsersId()!=null ) {
                        workshop.getJoinedUsersId().add(userId);
                    }else if(!workshop.getJoinedUsersId().contains(userId)) {
                        usersInWorkshop.add(userId);
                        workshop.setJoinedUsersId(usersInWorkshop);
                    }
                    //update wotkshop
                    this.updateWorkshop(workshopId,workshop);

                }else {
                    LOG.error("CAPACITY IS 0");
                }
            }else {
                LOG.error("WORKSHOPID IS NULL AND/OR USERID IS NULL");
            }
            }
    }

    public List<String> findJoinedUsers(String id) {

        Optional<Workshop> optionalWorkshop = this.workshopRepository.findById(id);
        if (optionalWorkshop.isPresent()) {
            Workshop workshop = optionalWorkshop.get();
            return workshop.getJoinedUsersId();
        }else {
            LOG.error("not found");
        }
        return null;
    }
}
