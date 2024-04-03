package org.dolymy.quiz.repos;

import org.dolymy.quiz.entities.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionRepository extends MongoRepository<Question,String> {

}
