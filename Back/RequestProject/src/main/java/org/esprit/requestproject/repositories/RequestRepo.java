package org.esprit.requestproject.repositories;

import org.esprit.requestproject.entities.Request;
import org.esprit.requestproject.entities.Status;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository


public interface RequestRepo extends MongoRepository<Request, Long> {

    @Query("{ $and: [ " +
            "{ $or: [ { 'title': { $regex: ?0, $options: 'i' } }, { ?0: null } ] }, " +
            "{ $or: [ { 'status': ?1 }, { ?1: null } ] } " +
            "] }")
    List<Request> advancedSearch(String title, Status status);

}



