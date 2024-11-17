package com.example.App_Dashbord.Controller;

import com.example.App_Dashbord.Model.Like;
import com.example.App_Dashbord.Model.Media;
import com.example.App_Dashbord.Service.LikeService;
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
}
