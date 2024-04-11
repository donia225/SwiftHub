package org.dolymy.post.daos;
import org.dolymy.post.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentDao extends JpaRepository<Comment,Integer> {
    List <Comment> findAll();

}
