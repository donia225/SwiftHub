package org.dolymy.post.controllers;

import lombok.AllArgsConstructor;
import org.dolymy.post.entities.Comment;
import org.dolymy.post.entities.Post;
import org.dolymy.post.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/post")

public class PostController {
    @Autowired
    private PostService postService;
    @GetMapping("")
    @ResponseBody
    public List<Post> getingAllPosts(){
        return this.postService.findAllPosts();
    }

    // FIND BY ID
    @GetMapping("/{id}")
    @ResponseBody
    public Optional<Post> findingUserById(@PathVariable Integer id) {
        return postService.findPostById(id);
    }


    //delete
    @DeleteMapping("/{id}")
    @ResponseBody
    public void deletingPostById(@PathVariable Integer id) {
        postService.deletePostById(id);
    }
    //add
    @PostMapping("")
    @ResponseBody
    public Post addPost(@RequestBody Post post) {
        return postService.addPost(post);
    }

    //Update
    @PutMapping("/{id}")
    @ResponseBody
    public Post updatingPost(@PathVariable Integer id, @RequestBody Post post) {
        Optional<Post> existingPost = postService.findPostById(id);
        if (!existingPost.isPresent()) {}
        post.setId(id);
        return postService.updatePost(post);
    }

    @GetMapping("/search")
    @ResponseBody
    public List<Post> searchingPostsByKeyword(@RequestParam String keyword) {
        return postService.findPostByKeyword(keyword);
    }

    @GetMapping("/by-date")
    @ResponseBody
    public List<Post> getingPostsByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date postDate) {
        return postService.findPostByPostDate(postDate);
    }


    @GetMapping("/{postId}/comments")
    @ResponseBody
    public ResponseEntity<?> getingCommentsForPost(@PathVariable Integer postId) {
        Optional<Post> post = postService.findPostById(postId);
        if (post.isPresent()) {
            List<Comment> comments = post.get().getComments();
            if (comments != null) {
                if (!comments.isEmpty()) {
                    return ResponseEntity.ok(comments);
                } else {
                    return ResponseEntity.ok("No comments for this post.");
                }
            } else {
                return ResponseEntity.ok("No comments for this post.");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
