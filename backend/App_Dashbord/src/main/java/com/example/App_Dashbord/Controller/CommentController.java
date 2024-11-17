package com.example.App_Dashbord.Controller;

import com.example.App_Dashbord.Model.Comment;
import com.example.App_Dashbord.Model.Follower;
import com.example.App_Dashbord.Service.CommentService;
import com.example.App_Dashbord.Service.MediaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(CommentController.class);
    @GetMapping("/all")
    public ResponseEntity<List<Comment>> findAllComments() {
        try {
            List<Comment> list = commentService.findAllComments();
            LOG.info("findAllComments()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllComments(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }
}
