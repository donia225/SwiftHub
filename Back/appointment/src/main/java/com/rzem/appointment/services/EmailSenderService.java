package com.rzem.appointment.services;

import org.springframework.stereotype.Service;


public interface EmailSenderService {
    public void sendEmail(String toEmail, String subject, String body);
}
