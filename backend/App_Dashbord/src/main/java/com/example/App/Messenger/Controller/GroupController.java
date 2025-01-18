package com.example.App.Messenger.Controller;

import com.example.App.Messenger.DTO.GroupDTO;
import com.example.App.Messenger.Model.Group;
import com.example.App.Messenger.Service.GroupService;
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
@RequestMapping("/api/group")
public class GroupController {
    @Autowired
    private GroupService groupService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(GroupController.class);

    @GetMapping("/all")
    public ResponseEntity<List<Group>> findAllGroups() {
        try {
            LOG.info("findAllGroups()- group - Successful.");
            return ResponseEntity.ok(groupService.findAllGroups());
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllGroups(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    @GetMapping("/suggesters/group")
    public ResponseEntity<List<GroupDTO>> findGroupsByName(@RequestParam("name") final String name, @RequestParam("search") final String search,
                                                        @RequestParam("page") final int page, @RequestParam("size") final int size) {
        try {
            LOG.info("findGroupsByName()- group - Successful.");
            return ResponseEntity.ok(groupService.findGroupsByName(name, search, page, size));
        } catch (Exception e) {
            LOG.info("Failed to retrieve findGroupsByName(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
}
