package org.dolymy.post.daos;
import org.dolymy.post.entities.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;

public interface PostDao extends MongoRepository<Post,Integer> {
    List<Post> findAll();
    List<Post> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
    List<Post> findByPostDate(Date postDate);

}
