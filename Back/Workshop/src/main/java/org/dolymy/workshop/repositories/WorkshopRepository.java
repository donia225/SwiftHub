package org.dolymy.workshop.repositories;

import org.dolymy.workshop.entities.Workshop;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WorkshopRepository extends MongoRepository<Workshop,String> {


}
