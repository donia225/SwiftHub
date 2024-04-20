package com.rzem.appointment.entities;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "ChatMessage")
public class ChatMessage {

    @Id
    private int id;
    private String content;
    private Date timestamp;
    private int senderId;
    private int receiverId;
    private Appointment appointment ;

}
