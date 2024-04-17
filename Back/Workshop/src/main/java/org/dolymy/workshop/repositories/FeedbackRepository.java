package org.dolymy.workshop.repositories;

import org.dolymy.workshop.entities.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends MongoRepository<Feedback,String> {
}
