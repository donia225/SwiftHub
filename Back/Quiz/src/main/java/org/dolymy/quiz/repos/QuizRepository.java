package org.dolymy.quiz.repos;

import org.dolymy.quiz.entities.Question;
import org.dolymy.quiz.entities.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizRepository extends MongoRepository<Quiz,Long> {

}
