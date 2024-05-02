package com.rzem.appointment.repos;

import com.rzem.appointment.entities.Appointment;
import com.rzem.appointment.entities.Availability;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment,Long> {
    void deleteById(String id);
    Optional<Appointment> findById(String id);
}
