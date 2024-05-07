package com.rzem.appointment.entities;

import jakarta.persistence.Id;
import lombok.*;
import org.bson.types.ObjectId;


import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data

public class TimeSlot {

    @Id
    private String id;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean reserved;

}
