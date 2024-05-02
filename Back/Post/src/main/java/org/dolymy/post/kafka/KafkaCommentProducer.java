package org.dolymy.post.kafka;

import org.dolymy.post.entities.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaCommentProducer {
    private static final String TOPIC = "notifications";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    //@Value("${kafka.topic.commentAdded}")
    //private String commentAddedTopic;

    public void sendCommentAddedMessage(Comment comment) {
        String message = comment.getIdUser() + " a commenté le post " + comment.getPost().getId();
        kafkaTemplate.send(TOPIC, message);
    }
}
