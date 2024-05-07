package com.rzem.appointment.entities;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.data.mongodb.core.index.Indexed;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Availability")
public class Availability {

    @Id
    private String id;
    @Indexed(unique = true)
    private String userId;
    private List<TimeSlot> availableTimeSlots;

}
