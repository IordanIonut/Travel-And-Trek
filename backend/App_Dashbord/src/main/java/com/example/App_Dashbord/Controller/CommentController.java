package com.example.App_Dashbord.Controller;

import com.example.App_Dashbord.Service.CommentService;
import com.example.App_Dashbord.Service.MediaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(CommentController.class);

}
