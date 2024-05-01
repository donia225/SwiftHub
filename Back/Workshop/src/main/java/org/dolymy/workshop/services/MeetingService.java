package org.dolymy.workshop.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Meeting;
import org.dolymy.workshop.entities.Workshop;
import org.dolymy.workshop.repositories.MeetingRepository;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MeetingService {
    private final MeetingRepository meetingRepository;
    private final WorkshopService workshopService;
    private static final Logger LOG = LoggerFactory.getLogger(MeetingService.class);

    public Meeting addMeeting() {
        Meeting meeting = new Meeting();
        meeting.setAccessKey(generateNumber());
        String link="http://localhost:4200/meeting?roomID=";
        meeting.setLink(link+meeting.getAccessKey());
        this.meetingRepository.save(meeting);
        return meeting;
    }

    private Long generateNumber() {
        Random random = new Random();
        return random.nextLong(5000);
    }

    public Meeting findMeetingById(String id) {
        Meeting meeting = null;
        if (id != null) {
            final Optional<Meeting> optionalMeeting = this.meetingRepository.findById(id);
            if (optionalMeeting.isPresent()) {
                meeting = optionalMeeting.get();
            } else {
                LOG.info("NON_PRESENT_ID", id);
            }
        } else {
            LOG.error("NULL ID PASSED");
        }


        return meeting;
    }

    public Meeting updateMeeting(String id, Meeting updatedMeeting) {
        Optional<Meeting> existingMeeting = this.meetingRepository.findById(id);

        if (existingMeeting.isPresent()) {
            if (updatedMeeting != null) {
                updatedMeeting.setMeeting_id(existingMeeting.get().getMeeting_id());
                return this.meetingRepository.save(updatedMeeting);
            } else {
                LOG.error("ERROR_UPDATE");
            }
        } else {
            LOG.error("ERROR_NON_PRESENT_ID");
        }

        return updatedMeeting;
    }






}
