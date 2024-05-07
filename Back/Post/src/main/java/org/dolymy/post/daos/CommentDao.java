package org.dolymy.post.daos;
import org.dolymy.post.entities.Comment;
import org.dolymy.post.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CommentDao extends JpaRepository<Comment,Integer> {
    List <Comment> findAll();
    void deleteByPost(Post post);

    List<Comment> findPostById(Integer postId);
}
