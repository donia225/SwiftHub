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

    @PostMapping("/send/{to}/{subject}/{body}")
    public ResponseEntity<?> sendEmail(@PathVariable String to, @PathVariable String subject, @PathVariable String body) {
        emailSenderService.sendEmail(to, subject, body);
        System.out.println("blablablabla");
        return ResponseEntity.ok().build();
    }
}
