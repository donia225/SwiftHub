package org.dolymy.post.ServicesImpl;
import lombok.AllArgsConstructor;
import org.dolymy.post.daos.CommentDao;
import org.dolymy.post.daos.PostDao;
import org.dolymy.post.entities.Comment;

import org.dolymy.post.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
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
    public void deleteCommentById(Integer id) {
        this.commentDao.deleteById(id);
    }
    //Add

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @PostMapping("/comments")
    public Comment addComment(@RequestBody Comment comment, int idPost){
        comment.setCommentDate(new Date());
        comment.setPost(postDao.findById(idPost).orElse(null));
        String message ="User "+ comment.getIdUser() + " commented post " + comment.getPost().getId();
        kafkaTemplate.send("notifications", message);
        return commentDao.save(comment);
    }
    @Override
    public Comment updateComment(Comment comment,int idPost) {
        comment.setPost(postDao.findById(idPost).orElse(null));
        return this.commentDao.save(comment);
    }

    @Override
    public List<Comment> findCommentsByPostId(Integer postId) {
        return commentDao.findPostById(postId);
    }
}