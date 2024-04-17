package com.rzem.appointment.controllers;


import com.rzem.appointment.servicesImpl.LocationServiceImpl;
import com.rzem.appointment.entities.Location;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments/location")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class LocationController {

    private final LocationServiceImpl service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Location location){
        service.saveLocation(location);
    }

    @GetMapping
    public ResponseEntity<List<Location>> findAlllocations(){
        return ResponseEntity.ok(service.findAlllocations());
    }

}
