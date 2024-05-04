package org.dolymy.workshop.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Meeting;
import org.dolymy.workshop.entities.Workshop;
import org.dolymy.workshop.repositories.FeedbackRepository;
import org.dolymy.workshop.repositories.MeetingRepository;
import org.dolymy.workshop.repositories.WorkshopRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class WorkshopService {

    private static final Logger LOG = LoggerFactory.getLogger(WorkshopService.class);
    private static final String ERROR_NULL_ID = "ID is NULL";
    private static final String ERROR_NON_PRESENT_ID = " cannot find object with id : %s";
    private static final String ERROR_UPDATE = "Error occurred while updating";

    private final WorkshopRepository workshopRepository;
    private final FeedbackRepository feedbackRepository;
    private  final MeetingRepository meetingRepository;
  //  private final MeetingService meetingService;


    public Workshop saveWorkshop(Workshop workshop) {
        //save workshopID to meeting if a meeting is created
//        Meeting meeting=null;
//        if (workshop.getMeetingId()!=null){
//            Optional<Meeting> optionalMeeting=this.meetingRepository.findById(workshop.getMeetingId());
//            if (optionalMeeting.isPresent()){
//                meeting=optionalMeeting.get();
//                meeting.setWorkshop_id(workshop.getWorkshop_id());
//                this.meetingService.updateMeeting(workshop.getMeetingId(), meeting);
//            }
//
//        }

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

    public boolean JoinWorkshop(String workshopId, String userId) {
        Workshop workshop=new Workshop();
        Integer workshopCapacity=null;
        List<String>usersInWorkshop=new ArrayList<String>();
        boolean check=false;
        if(workshopId!=null && userId!=null){
            Optional<Workshop> optionalWorkshop=this.workshopRepository.findById(workshopId);
            if (optionalWorkshop.isPresent())
            {
                workshop=optionalWorkshop.get();
                workshopCapacity=workshop.getCapacity();
                if (workshopCapacity>0) {
                    if (workshop.getJoinedUsersId() == null) {
                        usersInWorkshop.add(userId);
                        workshop.setJoinedUsersId(usersInWorkshop);
                        // reducing workshop capacity
                        workshop.setCapacity(workshop.getCapacity() - 1);
                        check = true;
                    } else if (workshop.getJoinedUsersId().stream().anyMatch(userId::equals)) {
                        check = false;
                    } else {
                        workshop.getJoinedUsersId().add(userId);
                        // reducing workshop capacity
                        workshop.setCapacity(workshop.getCapacity() - 1);
                        check = true;
                    }
                    //update workshop
                    this.updateWorkshop(workshopId,workshop);
                }else {
                    LOG.error("CAPACITY IS 0");
                }
            }else {
                LOG.error("WORKSHOPID IS NULL AND/OR USERID IS NULL");
            }
        }
        return check;
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

    /**
     *
     * @param id
     * @return a list of workshop where the id belongs to the user that joined that workshop
     */

    public List<Workshop> findUsersWorkshops(String id) {
         List<Workshop> workshops=this.findWorkshops();
         //get the workshops that have the user
       return workshops.stream().filter(workshop ->
             workshop.getJoinedUsersId()!=null&&workshop.getJoinedUsersId().stream().anyMatch(joinedUser -> joinedUser.equals(id))).collect(Collectors.toList());
    }
}
