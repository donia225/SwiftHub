package org.dolymy.workshop.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Meeting;
import org.dolymy.workshop.entities.Workshop;
import org.dolymy.workshop.repositories.MeetingRepository;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

}
