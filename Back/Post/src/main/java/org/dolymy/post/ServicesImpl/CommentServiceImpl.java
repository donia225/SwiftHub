package org.dolymy.post.ServicesImpl;

import lombok.AllArgsConstructor;
import org.dolymy.post.daos.CommentDao;
import org.dolymy.post.daos.PostDao;
import org.dolymy.post.entities.Comment;

import org.dolymy.post.services.CommentService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {



    private CommentDao commentDao;
    private PostDao postDao;

    @Override
    public List<Comment> findAllComments() {
        return this.commentDao.findAll();
    }

    public Optional<Comment> findCommentById(Integer id) {
        return this.commentDao.findById(id);
    }
    //delete
    @Override
    public void deleteById(Integer id) {
        this.commentDao.deleteById(id);
    }
    //Add

    @PostMapping("/comments")
    public Comment addComment(@RequestBody Comment comment, int idPost){
        comment.setCommentDate(new Date());
        comment.setPost(postDao.findById(idPost).orElse(null));
        return commentDao.save(comment);
    }

    //Update
    @Override
    public Comment updateComment(Comment comment) {
        return this.commentDao.save(comment);
    }

    @Override
    public List<Comment> findCommentsByPostId(Integer postId) {
        return commentDao.findPostById(postId);
    }
}