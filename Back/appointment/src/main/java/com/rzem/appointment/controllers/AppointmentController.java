package com.rzem.appointment.controllers;


import com.rzem.appointment.entities.Appointment;
import com.rzem.appointment.servicesImpl.AppointmentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments/appointment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AppointmentController {

    private final AppointmentServiceImpl service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Appointment appointment){
        service.saveAppointment(appointment);
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> findAllAppointments(){
        return ResponseEntity.ok(service.findAllAppointments());
    }

}
