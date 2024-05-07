package com.rzem.appointment.services;


import com.rzem.appointment.entities.Availability;

import java.util.Date;
import java.util.List;

public interface AvailabilityService {

    List<Availability> getAll();


    Availability findById(String id);


    Availability update(Availability availability);

    void delete (String id);

    Availability save (Availability availability);

    List<Availability> findAvailabilityByUserId(String id);

    //void makeTrue(String AvailabilityId, String TimeSlotId);
    void updateReservedStatus(String availabilityId, String timeSlotId);

    void updateReservedStatusfromTeacher(String teacherId, String start, String end);

}
