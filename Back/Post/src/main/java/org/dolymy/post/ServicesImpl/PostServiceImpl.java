package org.dolymy.post.ServicesImpl;

import org.dolymy.post.daos.PostDao;
import org.dolymy.post.entities.Comment;
import org.dolymy.post.entities.Post;
import org.dolymy.post.sequences.SequenceGeneratorService;
import org.dolymy.post.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    public static final String SEQUENCE_NAME = "post_sequence";

    @Autowired
    private PostDao postDao;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    @Override
    public List<Post> findAllPosts() {
        return postDao.findAll();
    }

    @Override
    public Optional<Post> findPostById(Integer id) {
        return postDao.findById(id);
    }

    @Override
    public void deletePostById(Integer id) {
        postDao.deleteById(id);
    }

    @Override
    public Post updatePost(Post post) {
        return postDao.save(post);
    }

    @Override
    public Post addPost(Post post) {
        post.setId(sequenceGeneratorService.getSequenceNumber(SEQUENCE_NAME));
        return postDao.save(post);
    }

    @Override
    public List<Post> findPostByKeyword(String keyword) {
        return postDao.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
    }

    @Override
    public List<Post> findPostByPostDate(Date postDate) {
        return postDao.findByPostDate(postDate);
    }

    @Override
    public List<Comment> findCommentsByPostId(Integer postId) {
        Optional<Post> post = postDao.findById(postId);
        return post.map(Post::getComments).orElse(Collections.emptyList());
    }
}
