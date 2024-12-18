package com.example.App.Service;

import com.example.App.Model.Comment;
import com.example.App.Repository.CommentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
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
}