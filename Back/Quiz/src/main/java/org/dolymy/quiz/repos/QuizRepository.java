package org.dolymy.quiz.repos;

import org.dolymy.quiz.entities.Question;
import org.dolymy.quiz.entities.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends MongoRepository<Quiz,String> {

}
