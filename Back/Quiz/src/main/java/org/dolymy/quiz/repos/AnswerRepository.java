package org.dolymy.quiz.repos;

import org.dolymy.quiz.entities.Answer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends MongoRepository<Answer,String> {
}
