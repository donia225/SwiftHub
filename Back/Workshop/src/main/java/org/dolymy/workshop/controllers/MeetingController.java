package org.dolymy.workshop.controllers;


import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Meeting;
import org.dolymy.workshop.services.MeetingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workshop/meetings")
@RequiredArgsConstructor
public class MeetingController {

    private  final MeetingService meetingService;

    @PostMapping
    public Meeting createMeeting(){
        return this.meetingService.addMeeting();
    }

    @GetMapping("{id}")
    public Meeting getMeetingById(@PathVariable String id){
        return this.meetingService.findMeetingById(id);
    }
}
