package com.rzem.appointment.servicesImpl;

import com.rzem.appointment.entities.Appointment;
import com.rzem.appointment.repos.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl {

    @Autowired
    private final AppointmentRepository repository;

    public void saveAppointment(Appointment appointment){
        repository.save(appointment);
    }

    public List<Appointment> findAllAppointments(){
        return repository.findAll();
    }

}
