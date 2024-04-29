package org.dolymy.post.services;

import org.dolymy.post.entities.Post;

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
    Post addPost(Post post);

    //Update
    Post updatePost(Post post);

    List<Post> findPostByKeyword(String keyword);
    List<Post> findPostByPostDate(Date postDate);


}
