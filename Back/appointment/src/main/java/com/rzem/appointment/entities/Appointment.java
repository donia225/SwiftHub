package com.rzem.appointment.entities;


import com.rzem.appointment.enums.AppointmentType;
import com.rzem.appointment.enums.Status;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "appointments")
public class Appointment {

    @Id
    private String id;//ma tit3malch
    private String description;//cye    1
    private Date start;//cye         2
    private Status status; //ma tit3malch
    private Boolean reminder;  //3
    private AppointmentType appointmentType;//4
    private String studentId; //ma tit3malch
    private String professorId;//5
    private Location location; //ma tit3malch
    private int priority; //6 tji
    private List<Feedback> feedbackList;  //ma tit3malch
    private List<Notification> notificationList; //ma tit3malch
    private Boolean absance; //ma tit3malch
    private String meetingLink; //ma tit3malch


}
