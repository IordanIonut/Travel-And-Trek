package com.example.App.Dashbord.Controller;

import com.example.App.Dashbord.Enum.PostEnum;
import com.example.App.Dashbord.Model.Comment;
import com.example.App.Dashbord.Service.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/post/number")
    public ResponseEntity<Long> findCountCommentsByPost(@RequestParam("id") final String id, @RequestParam("type") final PostEnum type) {
        try {
            LOG.info("findCountCommentsByPost()- user - Successful.");
            return ResponseEntity.ok(commentService.findCountCommentsByPost(id, type));
        } catch (Exception e) {
            LOG.info("Failed to retrieve findCountCommentsByPost(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(0L);
        }
    }
}
