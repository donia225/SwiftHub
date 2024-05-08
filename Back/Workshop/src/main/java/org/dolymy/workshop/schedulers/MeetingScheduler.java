package org.dolymy.workshop.schedulers;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Workshop;
import org.dolymy.workshop.repositories.MeetingRepository;
import org.dolymy.workshop.repositories.WorkshopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
@RequiredArgsConstructor
public class MeetingScheduler {
    @Autowired
    private  MeetingRepository meetingRepository;
    @Autowired
    private WorkshopRepository workshopRepository;
    @Scheduled(cron = "0 0 * * MON")
    public void removedEndedMeeting(){
        LocalDate today = LocalDate.now();
        List<Workshop> workshops= workshopRepository.findWorkshopByEnd_dateBefore(today);
       for(Workshop workshop: workshops){
           String meetingId=workshop.getMeetingId();
           if(meetingId!=null){
               this.meetingRepository.deleteById(meetingId);
               System.out.println("Meeting removed for workshop: " + workshop.getTitle());
           }else {
               System.out.println("There's no Meeting for workshop: " + workshop.getTitle());
           }
       }
    }
}
