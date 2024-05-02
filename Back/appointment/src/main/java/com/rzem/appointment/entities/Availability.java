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
@Document(collection = "Availability")
public class Availability {

    @Id
    private String id;
    private String userId;
    private List<TimeSlot> availableTimeSlots;

}
