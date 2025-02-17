package com.example.App.Dashbord.Controller;

import com.example.App.Dashbord.DTO.SearchDTO;
import com.example.App.Dashbord.DTO.UserDTO;
import com.example.App.Dashbord.DTO.UserProfileDTO;
import com.example.App.Dashbord.Model.User;
import com.example.App.Dashbord.Repository.HighlightRepository;
import com.example.App.Dashbord.Service.FollowerService;
import com.example.App.Dashbord.Service.PostService;
import com.example.App.Dashbord.Service.UserService;
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
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private FollowerService followerService;
    @Autowired
    private PostService postService;
    @Autowired
    private HighlightRepository highlightRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/all")
    public ResponseEntity<List<User>> findAllUsers() {
        try {
            List<User> list = userService.findAllUsers();
            LOG.info("findAllUsers()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.error("Failed to retrieve findAllUsers(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    @GetMapping("/name")
    public ResponseEntity<Optional<User>> findByName(@RequestParam("name") final String name) {
        try {
            Optional<User> user = userService.findByName(name);
            LOG.info("findByName()- user - Successful.");
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            LOG.error("Failed to retrieve findAllUsers(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/friends")
    public ResponseEntity<List<User>> findUsersFriendsStory(@RequestParam("name") final String name) {
        try {
            List<User> stories = userService.findUsersFriendsStory(name);
            LOG.info("findUsersFriendsStory()- user - Successful.");
            return ResponseEntity.ok(stories);
        } catch (Exception e) {
            LOG.error("Failed to retrieve findUsersFriendsStory(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    @GetMapping("/info")
    public ResponseEntity<UserProfileDTO> findUserByName(@RequestParam("name") final String name) {
        try {
            UserProfileDTO userDTO = new UserProfileDTO(userService.findByName(name), postService.countPostsByUserName(name),
                    followerService.countFollowersByUser(name),
                    followerService.countFollowingByUser(name),
                    highlightRepository.findAllHighlightsByUser(name));
            LOG.info("findUserByName()- user - Successful.");
            return ResponseEntity.ok(userDTO);
        } catch (Exception e) {
            LOG.error("Failed to retrieve findUsersFriendsStory(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/suggesters")
    public ResponseEntity<List<SearchDTO>> findSuggesters(@RequestParam("name") final String name, @RequestParam("type") final String type, @RequestParam("page") final int page, @RequestParam("size") final int size) {
        try {
            List<SearchDTO> searchDTO = userService.findSuggestersSearch(name, type, page, size);
            LOG.info("findSuggesters()- user - Successful.");
            return ResponseEntity.ok(searchDTO);
        } catch (Exception e) {
            LOG.error("Failed to retrieve findSuggesters(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/suggesters/user")
    public ResponseEntity<List<UserDTO>> findUsersAndFriendsByName(@RequestParam("name") final String name, @RequestParam("search") final String search,
                                                      @RequestParam("page") final int page, @RequestParam("size") final int size) {
        try {
            List<UserDTO> searchDTO = userService.findUsersAndMutualFriends(name, search, page, size);
            LOG.info("findUsersAndFriendsByName()- user - Successful.");
            return ResponseEntity.ok(searchDTO);
        } catch (Exception e) {
            LOG.error("Failed to retrieve findUsersAndFriendsByName(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
