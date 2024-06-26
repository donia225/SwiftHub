package org.dolymy.post.controllers;

import lombok.AllArgsConstructor;
import org.dolymy.post.entities.Comment;
import org.dolymy.post.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/post/comments")


public class CommentController {
    @Autowired
    private CommentService commentService;
    @GetMapping("")
    @ResponseBody
    public List<Comment> getingAllComments(){
        return this.commentService.findAllComments();
    }

    // FIND BY ID
    @GetMapping("/{id}")
    @ResponseBody
    public Optional<Comment> findingUserById(@PathVariable int id) {
        return commentService.findCommentById(id);
    }
    //delete
    @DeleteMapping("/{id}")
    @ResponseBody
    public void deletingCommentById(@PathVariable int id) {
        commentService.deleteCommentById(id);
    }
    //add
    @PostMapping("")
    @ResponseBody
    public ResponseEntity<Comment> addingComment(@RequestBody Comment comment, @RequestParam int idPost) {
        return commentService.addComment(comment,idPost);
    }

    //Update
    @PutMapping("/{id}")
    @ResponseBody
    public Comment updatingComment(@PathVariable int id, @RequestBody Comment comment, @RequestParam int idPost) {
        Optional<Comment> existingComment = commentService.findCommentById(id);
        if (!existingComment.isPresent()) {}
        comment.setId(id);
        return commentService.updateComment(comment,idPost);
    }



}
