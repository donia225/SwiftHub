package com.rzem.appointment.controllers;


import com.rzem.appointment.services.EmailSenderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments/email")
@RequiredArgsConstructor
public class EmailController {
    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String body) {
        emailSenderService.sendEmail(to, subject, body);
        return ResponseEntity.ok().build();
    }
}
