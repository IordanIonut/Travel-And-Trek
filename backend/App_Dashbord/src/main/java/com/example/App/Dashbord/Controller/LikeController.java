package com.example.App.Dashbord.Controller;

import com.example.App.Dashbord.DTO.UserDTO;
import com.example.App.Dashbord.Enum.LikeContentEnum;
import com.example.App.Dashbord.Enum.PostEnum;
import com.example.App.Dashbord.Model.Like;
import com.example.App.Dashbord.Service.LikeService;
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
@RequestMapping("/api/like")
public class LikeController {
    @Autowired
    private LikeService likeService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(LikeController.class);

    @GetMapping("/all")
    public ResponseEntity<List<Like>> findAllLikes() {
        try {
            List<Like> list = likeService.findAllLikes();
            LOG.info("findAllLikes()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllLikes(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/post/number")
    public ResponseEntity<Long> findCountLikesByPost(@RequestParam("id") final String id, @RequestParam("type") final PostEnum type) {
        try {
            LOG.info("findCountLikesByPost()- user - Successful.");
            return ResponseEntity.ok(this.likeService.findCountLikesByPost(id, type));
        } catch (Exception e) {
            LOG.info("Failed to retrieve findCountLikesByPost(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0L);
        }
    }

    @GetMapping("/post/userDTO")
    public ResponseEntity<List<UserDTO>> findUsersLikesByPost(@RequestParam("name") final String name, @RequestParam("id") final String id, @RequestParam("type") final PostEnum type, @RequestParam(value = "content", required = false) final LikeContentEnum content) {
        try {
            LOG.info("findUsersLikesByPost()- user - Successful.");
            return ResponseEntity.ok(this.likeService.findUsersLikesByPost(name,id, type, content));
        } catch (Exception e) {
            LOG.info("Failed to retrieve findUsersLikesByPost(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
}
