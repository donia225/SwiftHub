package org.dolymy.post.daos;
import org.dolymy.post.entities.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface CommentDao extends MongoRepository<Comment,Integer> {
    List <Comment> findAll();

}
