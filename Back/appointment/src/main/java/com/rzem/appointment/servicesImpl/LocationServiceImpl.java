package com.rzem.appointment.servicesImpl;

import com.rzem.appointment.entities.Location;
import com.rzem.appointment.repos.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl {

    @Autowired
    private final LocationRepository repository;

    public void saveLocation(Location location){
        repository.save(location);
    }

    public List<Location> findAlllocations(){
        return repository.findAll();
    }

}
