package org.dolymy.workshop.services;

import lombok.RequiredArgsConstructor;
import org.dolymy.workshop.entities.Feedback;
import org.dolymy.workshop.entities.Notification;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class NotificationService {


    private final SimpMessagingTemplate template;
    public void sendNotification(Feedback feedback) {
        System.out.println("NOTIFICATION IN PROGRESS..........");
        System.out.println("workshop :"+feedback.getWorkshop().getTitle());
        Notification notification = new Notification("New feedback added to workshop: "+ feedback.getWorkshop().getTitle());
//        template.convertAndSend("/topic/admin/notification", notification);
        template.convertAndSend("/topic/notification", notification);
        System.out.println("Notifications successfully sent to Angular !");
    }
}
