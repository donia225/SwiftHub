package com.rzem.appointment.services;

import com.rzem.appointment.entities.Location;

import java.util.List;

public interface LocationService {

    List<Location> getAllLocations();


    Location findLocationById(String id);


    Location updateLocation(Location location);

    void deleteLocation(String id);

    Location saveLocation(Location location);

}
