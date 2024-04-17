package org.esprit.requestproject.repositories;

import org.esprit.requestproject.entities.Request;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepo extends MongoRepository<Request, String> {



}

