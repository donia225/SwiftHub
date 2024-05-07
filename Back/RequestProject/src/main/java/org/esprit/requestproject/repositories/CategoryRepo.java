package org.esprit.requestproject.repositories;

import org.esprit.requestproject.entities.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepo extends MongoRepository<Category, Long> {
}
