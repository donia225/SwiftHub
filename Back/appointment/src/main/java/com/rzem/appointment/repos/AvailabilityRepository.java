package com.rzem.appointment.repos;

import com.rzem.appointment.entities.Availability;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvailabilityRepository extends MongoRepository <Availability,Long> {

}
