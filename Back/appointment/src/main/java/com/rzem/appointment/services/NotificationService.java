package com.rzem.appointment.services;

import com.rzem.appointment.entities.Notification;

import java.util.List;

public interface NotificationService {

    List<Notification> getAll();


    Notification findById(String id);


    Notification update(Notification notification);

    void delete (String id);

    Notification save (Notification notification);

}
