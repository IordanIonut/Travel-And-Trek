package com.example.App.Dashbord.Controller;

import com.example.App.Dashbord.DTO.UserDTO;
import com.example.App.Dashbord.Enum.FollowerStatusEnum;
import com.example.App.Dashbord.Model.Follower;
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
            LOG.info("findAllFollowers()- follower - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.error("Failed to retrieve findAllFollowers(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/find")
    public ResponseEntity<List<UserDTO>> findUsersFollowerByStatus(@RequestParam("name") final String name, @RequestParam("status") final FollowerStatusEnum status, @RequestParam("page") final int index, @RequestParam("size") final int number) {
        try {
            List<UserDTO> list = followerService.findUsersFollowerByStatus(name, status, index, number);
            LOG.info("findUsersFollowerByStatus()- follower - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.error("Failed to retrieve findUsersFollowerByStatus(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    @GetMapping("/find/follower")
    public ResponseEntity<List<UserDTO>> findUsersByFollowerStatus(@RequestParam("name") final String name, @RequestParam("status") final FollowerStatusEnum status, @RequestParam("page") final int index, @RequestParam("size") final int number) {
        try {
            List<UserDTO> list = followerService.findUsersByFollowerStatus(name, status, index, number);
            LOG.info("findUsersByFollowerStatus()- follower - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.error("Failed to retrieve findUsersByFollowerStatus(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Void> postCreateFollower(@RequestBody final Follower body) {
        try {
            this.followerService.postCreateFollower(body);
            LOG.info("postCreateFollower()- follower - Successful.");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.error("Failed to retrieve postCreateFollower(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @GetMapping("/suggestion")
    public ResponseEntity<List<UserDTO>> findUserSuggestions(@RequestParam("name") final String name,
                                                            @RequestParam("hashtags") final List<String> hashtags,
                                                            @RequestParam("index") final int index,
                                                            @RequestParam("number") final int number) {
        try {
            List<UserDTO> list = followerService.findUserSuggestions(name, hashtags, index, number);
            LOG.info("findUserSuggestion()- follower - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.error("Failed to retrieve findUserSuggestion(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> deleteFollower(@RequestBody final Follower body) {
        try {
            this.followerService.deleteFollower(body);
            LOG.info("deleteFollower()- follower - Successful.");
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            LOG.error("Failed to retrieve deleteFollower(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
