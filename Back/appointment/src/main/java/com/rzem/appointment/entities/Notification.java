package com.rzem.appointment.entities;

import com.rzem.appointment.enums.NotificationType;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Notification")
public class Notification {

    @Id
    private int id;
    private String content;
    private Date sentTime;
    private String recipientId;
    private NotificationType notificationType;
    private Appointment appointment;
}
