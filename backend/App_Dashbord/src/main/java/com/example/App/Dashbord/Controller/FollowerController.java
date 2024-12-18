package com.example.App.Controller;

import com.example.App.Model.Follower;
import com.example.App.Service.FollowerService;
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
@RequestMapping("/api/follower")
public class FollowerController {
    @Autowired
    private FollowerService followerService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(FollowerController.class);

    @GetMapping("/all")
    public ResponseEntity<List<Follower>> findAllFollowers() {
        try {
            List<Follower> list = followerService.findAllFollowers();
            LOG.info("findAllFollowers()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllFollowers(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }
}