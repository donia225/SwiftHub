package com.rzem.appointment.repos;

import com.rzem.appointment.entities.Availability;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AvailabilityRepository extends MongoRepository <Availability,Long> {
    void deleteById(String id);
    Optional<Availability> findById(String id);
}
