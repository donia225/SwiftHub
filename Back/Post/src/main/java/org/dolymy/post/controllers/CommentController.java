package org.dolymy.post.controllers;

import lombok.AllArgsConstructor;
import org.dolymy.post.entities.Comment;
import org.dolymy.post.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/comments")
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
        commentService.deleteById(id);
    }
    //add
    @PostMapping("")
    @ResponseBody
    public Comment addingComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }

    //Update
    @PutMapping("/{id}")
    @ResponseBody
    public Comment updatingComment(@PathVariable int id, @RequestBody Comment comment) {
        Optional<Comment> existingComment = commentService.findCommentById(id);
        if (!existingComment.isPresent()) {}
        comment.setId(id);
        return commentService.updateComment(comment);
    }



}
