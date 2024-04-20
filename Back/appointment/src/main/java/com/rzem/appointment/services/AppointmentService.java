package com.rzem.appointment.services;



import com.rzem.appointment.entities.Appointment;

import java.util.List;

public interface AppointmentService {

    List<Appointment> getAllAppointments();


    Appointment findAppointmentById(String id);


    Appointment updateAppointment(Appointment appointment);

    void deleteAppointment(String id);

    Appointment saveAppointment(Appointment appointment);

}
