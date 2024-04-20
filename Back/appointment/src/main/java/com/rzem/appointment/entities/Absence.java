package com.rzem.appointment.entities;

import com.rzem.appointment.enums.AbsenceStatus;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/*
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Absence")
public class Absence {

    @Id
    private int id;
    private Appointment appointment;
    private String reason;
    private Date absenceTime;
    private AbsenceStatus status;


}


 */