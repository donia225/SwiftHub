package com.rzem.appointment.entities;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Feedback")
public class Feedback {

    @Id
    private int id;
    private String comment;
    private int rating;
    //private String studentId;
    private Appointment appointment;

}
