package org.dolymy.quiz.repos;

import org.dolymy.quiz.entities.Answer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnswerRepository extends MongoRepository<Answer,Long> {
}
