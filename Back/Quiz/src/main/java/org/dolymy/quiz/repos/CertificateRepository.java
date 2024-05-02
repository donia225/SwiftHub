package org.dolymy.quiz.repos;

import org.dolymy.quiz.entities.Certificate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificateRepository extends MongoRepository<Certificate,String> {
}
