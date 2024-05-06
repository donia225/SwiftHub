package com.rzem.appointment.entities;


import com.rzem.appointment.enums.AppointmentType;
import com.rzem.appointment.enums.Priority;
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
    private String id;
    private String description; //yes
    private Date start;  //yes
    private Date end;  //yes
    private Status status;
    private Boolean reminder;  //yes
    private AppointmentType appointmentType;  //yes
    private String studentId;
    private String professorId;  //yes
    private String location;
    private Priority priority;  //yes
    private Boolean absance;
    private String meetingLink;


}
