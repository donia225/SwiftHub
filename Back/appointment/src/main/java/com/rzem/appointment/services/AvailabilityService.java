package com.rzem.appointment.services;


import com.rzem.appointment.entities.Availability;

import java.util.List;

public interface AvailabilityService {

    List<Availability> getAll();


    Availability findById(Long id);


    Availability update(Availability availability);

    void delete (Long id);

    Availability save (Availability availability);

}
