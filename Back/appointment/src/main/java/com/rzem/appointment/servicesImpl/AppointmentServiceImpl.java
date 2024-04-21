package com.rzem.appointment.servicesImpl;

import com.rzem.appointment.entities.Appointment;
import com.rzem.appointment.entities.Availability;
import com.rzem.appointment.repos.AppointmentRepository;
import com.rzem.appointment.services.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private static final Logger LOG = LoggerFactory.getLogger(AvailabilityServiceImpl.class);
    private static final String ERROR_NULL_ID = "Posted ID is NULL";
    private static final String ERROR_NON_PRESENT_ID = "Cannot find Appointment with id : %s";
    private static final String ERROR_UPDATE = "Error occured while updating";
    private static final String ERROR_SAVE = "Error occured while saving";


    @Autowired
    private final AppointmentRepository repository;

    @Override
    public List<Appointment> getAllAppointments() {
        return repository.findAll();
    }

    @Override
    public void deleteAppointment(String id) {
        this.repository.deleteById(id);
        //System.out.println(id);
        //System.out.println("tfassa5 thanna");
    }

    @Override
    public Appointment findAppointmentById(String id) {
        Appointment appointment = null;
        if (id != null) {
            final Optional<Appointment> optionalAppointment = this.repository.findById(id);
            if (optionalAppointment.isPresent()) {
                appointment = optionalAppointment.get();
            } else {
                LOG.info(String.format(ERROR_NON_PRESENT_ID, id));
            }
        } else {
            LOG.error(ERROR_NULL_ID);
        }
        return appointment;
    }

    @Override
    public Appointment updateAppointment(Appointment appointment) {
        Appointment updatedAppointment = null;
        if (appointment != null) {
            updatedAppointment = this.repository.save(appointment);
        } else {
            LOG.error(ERROR_UPDATE);
        }
        return updatedAppointment;
    }



    public Appointment saveAppointment(Appointment appointment){
        Appointment addedAppointment = null;
        if (appointment != null) {
            addedAppointment = this.repository.save(appointment);
        } else {
            LOG.error(ERROR_SAVE);
        }
        return addedAppointment;
    }



}
