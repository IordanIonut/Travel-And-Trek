package com.example.App_Dashbord.Service;

import com.example.App_Dashbord.Repository.CommentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(CommentService.class);
}
