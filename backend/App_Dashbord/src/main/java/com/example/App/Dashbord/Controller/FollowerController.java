package com.example.App.Dashbord.Controller;

import com.example.App.Dashbord.Enum.FollowerStatusEnum;
import com.example.App.Dashbord.Model.Follower;
import com.example.App.Dashbord.Model.User;
import com.example.App.Dashbord.Service.FollowerService;
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

    @GetMapping("find")
    public ResponseEntity<List<User>> findUsersByStatus(@RequestParam("name") final String name, @RequestParam("status") final FollowerStatusEnum status) {
        try {
            List<User> list = followerService.findUsersByStatus(name, status);
            LOG.info("findUsersByStatus()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findUsersByStatus(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }
}
