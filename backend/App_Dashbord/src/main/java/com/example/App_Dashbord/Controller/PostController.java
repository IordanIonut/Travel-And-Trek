package com.example.App_Dashbord.Controller;

import com.example.App_Dashbord.Enum.PostEnum;
import com.example.App_Dashbord.Model.Post;
import com.example.App_Dashbord.Service.PostService;
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
@RequestMapping("/api/post")
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(PostController.class);

    @GetMapping("/all")
    public ResponseEntity<List<Post>> findAllPosts() {
        try {
            List<Post> list = postService.findAllPosts();
            LOG.info("findAllPosts()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllPosts(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/find")
    public ResponseEntity<List<Post>> findAllPostsByUser(@RequestParam("name") final String name,
                                                         @RequestParam("type") final PostEnum type,
                                                         @RequestParam("index") final int index,
                                                         @RequestParam("number") final int number) {
        try {
            List<Post> list = postService.findAllPostsByUser(name, type, index, number);
            LOG.info("findAllPostsByUser()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllPostsByUser(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }
}
