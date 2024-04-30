package org.dolymy.workshop.controllers;

import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Meeting;
import org.dolymy.workshop.repositories.MeetingRepository;
import org.dolymy.workshop.services.MeetingService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/workshop/meetings")
@RequiredArgsConstructor
public class MeetingController {
    private final MeetingService meetingService;

    @PostMapping
    public Meeting createMeeting(@RequestBody Meeting meeting){
        return this.meetingService.addMeeting(meeting);
    }
}
