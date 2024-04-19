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
    private String id;//cye
    private String description;//cye
    private Date start;//cye
    private Status status;
    private Boolean reminder;
    private AppointmentType appointmentType;
    private int studentId;//c bon
    private int professorAdminId;//c bon
    private Location location;
    //private int priority;
    private List<Feedback> feedbackList;
    private List<Notification> notificationList;
    private Boolean absance;
    private String meetingLink;

    public Status getStatus() {
        return status;
    }
}
