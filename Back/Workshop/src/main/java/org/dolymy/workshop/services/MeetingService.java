package org.dolymy.workshop.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Meeting;
import org.dolymy.workshop.repositories.MeetingRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;


    public Meeting addMeeting(Meeting meeting) {
        return this.meetingRepository.save(meeting);
    }
}
