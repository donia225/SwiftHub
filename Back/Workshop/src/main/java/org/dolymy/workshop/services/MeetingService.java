package org.dolymy.workshop.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Meeting;
import org.dolymy.workshop.entities.Workshop;
import org.dolymy.workshop.repositories.MeetingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final WorkshopService workshopService;
    private static final Logger LOG = LoggerFactory.getLogger(MeetingService.class);

    public Meeting addMeeting(Meeting meeting) {
       if(meeting.getWorkshop_id()!=null){
           //add meeting id to workshop
           Workshop workshop=this.workshopService.findWorkshopById(meeting.getWorkshop_id());
           if (workshop!=null){
               workshop.setMeeting_id(meeting.getMeeting_id());
               this.workshopService.updateWorkshop(meeting.getWorkshop_id(),workshop);
           }else {
               LOG.error("WORKSHOP DOESN`T EXIST");
           }
           //save to DB
           return this.meetingRepository.save(meeting);
       }
        //meeting isn't saved to DB
        return meeting;
    }
}
