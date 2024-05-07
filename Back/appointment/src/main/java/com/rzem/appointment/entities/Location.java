package com.rzem.appointment.entities;


import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "location")
public class Location {

    @Id
    private String id;
    private String bloc;
    private String salle;
    private List<Appointment> appointments;


}
