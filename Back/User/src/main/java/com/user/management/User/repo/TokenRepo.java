package com.user.management.User.repo;

import com.user.management.User.token.Token;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepo extends MongoRepository<Token,String> {



    @Query("{'user.id': ?0, $or: [{'expired': false}, {'revoked': false}]}")
    List<Token> findAllValidTokenByUser(String userId);

    Optional<Token> findByToken(String token);

    @Query("[{'expired': false} , {'revoked': false}]")
    Optional<List<Token>> findAllByToken(String token);


}

