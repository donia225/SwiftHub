package org.esprit.requestproject.repositories;

import org.esprit.requestproject.entities.Answer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepo extends MongoRepository<Answer,Long> {
}
