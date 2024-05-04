package org.dolymy.post.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaCommentConsumer {

    @KafkaListener(topics = "notifications",groupId= "group-id")
    public void listen(String message) {
        // Logique pour traiter le message et déclencher la notification appropriée
        System.out.println("Notification: " + message);
    }
}
