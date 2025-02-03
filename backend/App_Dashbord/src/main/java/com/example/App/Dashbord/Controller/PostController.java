package com.example.App.Dashbord.Controller;

import com.example.App.Dashbord.Enum.PostEnum;
import com.example.App.Dashbord.Model.Post;
import com.example.App.Dashbord.Service.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @GetMapping("/find/type")
    public ResponseEntity<List<Post>> findAllPostsByUserType(@RequestParam("name") final String name,
                                                             @RequestParam("type") final PostEnum type,
                                                             @RequestParam("index") final int index,
                                                             @RequestParam("number") final int number) {
        try {
            List<Post> list = postService.findAllPostsByUserType(name, type, index, number);
            LOG.info("findAllPostsByUser()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllPostsByUser(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/find")
    public ResponseEntity<List<Post>> findAllPostsByUserWithoutType(@RequestParam("name") final String name,
                                                                    @RequestParam("index") final int index,
                                                                    @RequestParam("number") final int number) {
        try {
            List<Post> list = postService.findAllPostsByUserWithoutType(name, index, number);
            LOG.info("findAllPostsByUserWithoutType()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllPostsByUser(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/find/tags")
    public ResponseEntity<List<Post>> findPostByUserTags(@RequestParam("name") final String name,
                                                         @RequestParam("index") final int index,
                                                         @RequestParam("number") final int number) {
        try {
            List<Post> list = postService.findPostByUserTags(name, index, number);
            LOG.info("findPostByUserTags()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllPostsByUser(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/suggestion")
    public ResponseEntity<List<Post>> getPostBySearch(@RequestParam("search") final String search,
                                                      @RequestParam("index") final int index,
                                                      @RequestParam("number") final int number) {
        try {
            List<Post> list = postService.getPostBySearch(search, index, number);
            LOG.info("findPostBySearch()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findPostBySearch(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/reel")
    public ResponseEntity<List<Post>> getPostByUser(@RequestParam("name") final String name,
                                                           @RequestParam("type") final PostEnum type,
                                                           @RequestParam("hashtags") final List<String> hashtags,
                                                           @RequestParam("index") final int index,
                                                           @RequestParam("number") final int number) {
        try {
            List<Post> list = postService.getPostByUser(name, type, hashtags, index, number);
            LOG.info("getPostByUser()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve getPostByUser(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/get/group")
    public ResponseEntity<List<Post>> getPostByGroupNameAndType(@RequestParam("name") final String name,
                                                                @RequestParam(value = "type", required = false) final PostEnum type,
                                                                @RequestParam("index") final int index,
                                                                @RequestParam("number") final int number) {
        try {
            List<Post> list = postService.getPostByGroupNameAndType(name, type, index, number);
            LOG.info("getPostByGroupNameAndType()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve getPostByGroupNameAndType(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }
}
