package org.dolymy.quiz.repos;

import org.dolymy.quiz.entities.Answer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnswerRepository extends MongoRepository<Answer,Long> {

}
