package org.dolymy.post.services;


import org.dolymy.post.entities.Comment;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    List<Comment> findAllComments();
    Optional<Comment> findCommentById(Integer id);
    //detele
    void deleteCommentById(Integer id);
    //Add
    //Comment addComment(Comment comment, int idPost);
    ResponseEntity<Comment> addComment(@RequestBody Comment comment, @RequestParam int idPost) ;

    //Update
    Comment updateComment(Comment comment,int idPost);
    List<Comment> findCommentsByPostId(Integer postId);
}
