package com.example.App.Dashbord.Service;

import com.example.App.AppDashbordApplication;
import com.example.App.Dashbord.Embedded.CommentId;
import com.example.App.Dashbord.Enum.PostEnum;
import com.example.App.Dashbord.Repository.CommentRepository;
import com.example.App.Dashbord.Model.Comment;
import com.example.App.Dashbord.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(CommentService.class);

    @Cacheable(value = "commentCache", key = "'allComment'")
    public List<Comment> findAllComments() {
        return commentRepository.findAll();
    }

    @Cacheable(value = "commentCache", key = "'lastIdByType'")
    public Long findLastIdByType(final String type){
        return commentRepository.findLastIdByType(type);
    }

    @Cacheable(value = "commentCache", key = "'findCountCommentsByPost::'+#id+'::'+#type")
    public Long findCountCommentsByPost(String id, PostEnum type){
        return commentRepository.findCountCommentsByPost(id, type);
    }

    @Cacheable(value = "commentCache", key = "'findCommentsByPost::'+#id+'::'+#type")
    public List<Comment> findCommentsByPost(String id, PostEnum type){
        return commentRepository.findCommentsByPost(id, type);
    }

    @CacheEvict(value = "commentCache",  allEntries = true)
    public void postComment(Comment comment){
        comment.getId().setId(new AppDashbordApplication().generateId());
        comment.getComment_user_id().setId(userRepository.findByName(comment.getComment_user_id().getName()).get().getId());
        commentRepository.save(comment);
        LOG.info("Comment successfully saved with ID: {}", comment);
    }

    @Cacheable(value = "commentCache", key ="'findCommentById::'+#id.id+'::'+#id.type")
    public Optional<Comment> findCommentById(CommentId id){
        return commentRepository.findCommentById(id);
   }
}
