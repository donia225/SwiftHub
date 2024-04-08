package org.dolymy.post.ServicesImpl;
import org.dolymy.post.daos.CommentDao;
import org.dolymy.post.entities.Comment;
import org.dolymy.post.sequences.SequenceGeneratorService;
import org.dolymy.post.services.CommentService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;


@Service
public class CommentServiceImpl implements CommentService {
    public static final String SEQUENCE_NAME = "comment_sequence";


    @Resource
    private CommentDao commentDao;

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
    @Autowired
    private SequenceGeneratorService service;
    @PostMapping("/comments")
    public Comment addComment(@RequestBody Comment comment){
        //generate sequence
        comment.setId(service.getSequenceNumber(SEQUENCE_NAME));
        return commentDao.save(comment);
    }

    //Update
    @Override
    public Comment updateComment(Comment comment) {
        return this.commentDao.save(comment);
    }
}