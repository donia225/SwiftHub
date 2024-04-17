package com.rzem.appointment.controllers;


import com.rzem.appointment.entities.Location;
import com.rzem.appointment.entities.Notification;
import com.rzem.appointment.servicesImpl.LocationServiceImpl;
import com.rzem.appointment.servicesImpl.NotificationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments/notification")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class NotificationController {

    private final NotificationServiceImpl service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Notification notification){
        service.save(notification);
    }

    @GetMapping
    public ResponseEntity<List<Notification>> findAll(){
        return ResponseEntity.ok(service.getAll());
    }

}
