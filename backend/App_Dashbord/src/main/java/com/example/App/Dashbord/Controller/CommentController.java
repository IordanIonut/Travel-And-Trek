package com.example.App.Dashbord.Controller;

import com.example.App.Dashbord.Embedded.CommentId;
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
import java.util.Optional;

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
            LOG.error("Failed to retrieve findAllComments(): {}", e.getMessage(), e);
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
            LOG.error("Failed to retrieve findCountCommentsByPost(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(0L);
        }
    }

    @GetMapping("/post")
    public ResponseEntity<List<Comment>> findCommentsByPost(@RequestParam("id") final String id, @RequestParam("type") final PostEnum type) {
        try {
            LOG.info("findCommentsByPost()- user - Successful.");
            return ResponseEntity.ok(commentService.findCommentsByPost(id, type));
        } catch (Exception e) {
            LOG.error("Failed to retrieve findCommentsByPost(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Void> postComment(@RequestBody Comment comment) {
        try {
            LOG.info("postComment() - user - Successful.");
            commentService.postComment(comment);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.error("Failed to retrieve postComment(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/find/id")
    public ResponseEntity<Optional<Comment>> findCommentById(@RequestParam("id") final CommentId id){
        try {
            LOG.info("findCommentById()- user - Successful.");
            return ResponseEntity.ok(commentService.findCommentById(id));
        } catch (Exception e) {
            LOG.error("Failed to retrieve findCommentById(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
