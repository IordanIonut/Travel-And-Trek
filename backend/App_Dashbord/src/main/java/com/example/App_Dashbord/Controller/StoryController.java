package com.example.App_Dashbord.Controller;

import com.example.App_Dashbord.Model.Story;
import com.example.App_Dashbord.Model.User;
import com.example.App_Dashbord.Service.StoryService;
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
@RequestMapping("/api/story")
public class StoryController {
    @Autowired
    private StoryService storyService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(StoryController.class);

    @GetMapping("/all")
    public ResponseEntity<List<Story>> findAllStores(){
        try {
            List<Story> list = storyService.findAllStores();
            LOG.info("findAllStores()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllStores(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/friends")
    public ResponseEntity<List<Story>> findUsersFriendsStory(@RequestParam("name") final String name, @RequestParam("view") final String view) {
        try {
            List<Story> stories = storyService.findUsersFriendsStory(name, view);
            LOG.info("findUsersFriendsStory()- user - Successful.");
            return ResponseEntity.ok(stories);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findUsersFriendsStory(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }
}
