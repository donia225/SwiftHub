package org.dolymy.quiz.repos;

import org.dolymy.quiz.entities.Question;
import org.dolymy.quiz.entities.Result;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends MongoRepository<Result,String> {
}
