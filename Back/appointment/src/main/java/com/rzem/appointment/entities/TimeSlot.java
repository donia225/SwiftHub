package com.rzem.appointment.entities;

import lombok.*;


import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data

public class TimeSlot {


    private int id;
    private Date startTime;
    private Date endTime;

}
