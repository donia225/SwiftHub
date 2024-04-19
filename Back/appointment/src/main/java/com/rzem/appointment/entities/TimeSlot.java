package com.rzem.appointment.entities;

import jakarta.persistence.Id;
import lombok.*;


import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data

public class TimeSlot {

    private Date startTime;
    private Date endTime;

}
