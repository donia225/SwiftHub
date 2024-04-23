package com.rzem.appointment.repos;

import com.rzem.appointment.entities.Availability;
import com.rzem.appointment.entities.Location;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends MongoRepository<Location,Long> {
    void deleteById(String id);
    Optional<Availability> findById(String id);
}
