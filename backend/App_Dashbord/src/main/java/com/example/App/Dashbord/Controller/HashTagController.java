package com.example.App.Dashbord.Controller;

import com.example.App.Dashbord.DTO.UserDTO;
import com.example.App.Dashbord.Model.Highlight;
import com.example.App.Dashbord.Model.Post;
import com.example.App.Dashbord.Model.User;
import com.example.App.Dashbord.Service.HashTagService;
import com.example.App.Dashbord.Service.HighlightService;
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
@RequestMapping("/api/hashtags")
public class HashTagController {
    @Autowired
    private HashTagService hashTagService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(HashTagController.class);

    @GetMapping("/get/post")
    public ResponseEntity<List<Post>> getPostByTag(@RequestParam("hashtags") List<String> hashtags,
                                                   @RequestParam("index") int index,
                                                   @RequestParam("number") int number) {
        try {
            List<Post> list = hashTagService.getPostByTag(hashtags, index, number);
            LOG.info("getPostByTag()- hashtag - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve getPostByTag(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/get/user")
    public ResponseEntity<List<UserDTO>> getUserByTag(@RequestParam("name") String name,
                                                   @RequestParam("hashtags") List<String> hashtags,
                                                   @RequestParam("index") int index,
                                                   @RequestParam("number") int number) {
        try {
            List<UserDTO> list = hashTagService.getUserByTag(name,hashtags, index, number);
            LOG.info("getUserByTag()- hashtag - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve getUserByTag(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }
}
