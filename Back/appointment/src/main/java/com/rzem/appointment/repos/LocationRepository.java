package com.rzem.appointment.repos;

import com.rzem.appointment.entities.Location;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends MongoRepository<Location,Long> {
}
