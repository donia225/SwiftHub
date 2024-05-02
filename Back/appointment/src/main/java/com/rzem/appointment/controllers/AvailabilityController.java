package com.rzem.appointment.controllers;



import com.rzem.appointment.entities.Availability;
import com.rzem.appointment.servicesImpl.AvailabilityServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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

    @GetMapping("/{id}")
    public ResponseEntity<List<Availability>> findAvailabilitysByIdUser(@PathVariable String id){
        return ResponseEntity.ok(service.findAvailabilityByUserId(id));
    }

    @PutMapping("/{availabilityId}/timeslot/{timeSlotId}")
    public ResponseEntity<String> updateReservedStatus(@PathVariable String availabilityId, @PathVariable String timeSlotId) {
        service.updateReservedStatus(availabilityId, timeSlotId);
        return ResponseEntity.ok("Reserved status updated successfully");
    }

    @PutMapping("/{teacherId}/{start}/{end}")
    public ResponseEntity<String> updateReservedStatusTeacher(@PathVariable String teacherId, @PathVariable String start , @PathVariable String end) {
        service.updateReservedStatusfromTeacher(teacherId, start, end);
        System.out.println(teacherId);
        System.out.println(start);
        System.out.println(end);
        return ResponseEntity.ok("Reserved status updated successfully");

    }




}
