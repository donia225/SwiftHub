package org.dolymy.workshop.repositories;

import org.dolymy.workshop.entities.Workshop;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkshopRepository extends MongoRepository<Workshop,Long> {
}
