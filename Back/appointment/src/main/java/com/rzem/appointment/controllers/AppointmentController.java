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
public class AppointmentController {

    private final AppointmentServiceImpl service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Appointment appointment){
        service.saveAppointment(appointment);
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> findAllAppointments(){
        return ResponseEntity.ok(service.getAllAppointments());
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Appointment getAppointmentById(@PathVariable String id) {
        // Lambda Example
        return id != null ? this.service.findAppointmentById(id) : null;
    }


    @PutMapping
    @ResponseBody
    public Appointment updateAppointment(@RequestBody Appointment appointment) {
        return appointment != null ? this.service.updateAppointment(appointment) : null;
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAppointment(@PathVariable String id) {
        if (id != null) {
            this.service.deleteAppointment(id);
        }
    }

}
