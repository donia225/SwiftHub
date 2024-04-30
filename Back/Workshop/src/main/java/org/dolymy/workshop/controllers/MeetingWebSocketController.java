package org.dolymy.workshop.controllers;

import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Meeting;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MeetingWebSocketController {

    @MessageMapping("/startMeeting")
    @SendTo("/topic/meetinStatus")
    public String startMeeting(Meeting meeting){
        String meetingId=meeting.getMeeting_id();
        return "Meeting started: " + meeting.getMeeting_id();
    }
}
