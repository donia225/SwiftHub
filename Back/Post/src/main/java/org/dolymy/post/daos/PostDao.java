package org.dolymy.post.daos;
import org.dolymy.post.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PostDao extends JpaRepository<Post,Integer> {
    List<Post> findAll();
    List<Post> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
    List<Post> findByPostDate(Date postDate);

}

