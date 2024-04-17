package com.rzem.appointment.controllers;



import com.rzem.appointment.entities.Availability;
import com.rzem.appointment.servicesImpl.AvailabilityServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments/availability")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AvailabilityController {

    private final AvailabilityServiceImpl service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Availability availability){
        service.save(availability);
    }

    @GetMapping
    public ResponseEntity<List<Availability>> findAllAvailabilitys(){
        return ResponseEntity.ok(service.getAll());
    }

}
