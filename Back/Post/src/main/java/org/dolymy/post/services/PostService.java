package org.dolymy.post.services;
import org.dolymy.post.entities.Post;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface PostService {
    List<Post> findAllPosts();
    //  Student addStudent(Student student);
    Optional<Post> findPostById(Integer id);

    //detele
    void deletePostById(Integer id);
    //Add
    //Post addPost(Post post);
    ResponseEntity<Post> addPost(@RequestBody Post post);    //Update
    Post updatePost(Post post);

    List<Post> findPostByKeyword(String keyword);
    List<Post> findPostByPostDate(Date postDate);


}
