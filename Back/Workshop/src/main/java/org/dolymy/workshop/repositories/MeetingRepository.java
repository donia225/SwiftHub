package org.dolymy.workshop.repositories;

import org.dolymy.workshop.entities.Meeting;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRepository extends MongoRepository<Meeting,String> {
}
