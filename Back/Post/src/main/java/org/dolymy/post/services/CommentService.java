package org.dolymy.post.services;


import org.dolymy.post.entities.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    List<Comment> findAllComments();
    Optional<Comment> findCommentById(Integer id);
    //detele
    void deleteById(Integer id);
    //Add
    Comment addComment(Comment comment, int idPost);

    //Update
    Comment updateComment(Comment comment);
    List<Comment> findCommentsByPostId(Integer postId);
}
