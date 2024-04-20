package com.rzem.appointment.services;


import com.rzem.appointment.entities.Availability;

import java.util.List;

public interface AvailabilityService {

    List<Availability> getAll();


    Availability findById(String id);


    Availability update(Availability availability);

    void delete (String id);

    Availability save (Availability availability);

}
