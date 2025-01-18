package com.example.App.Messenger.Controller;

import com.example.App.Messenger.Model.GroupMembership;
import com.example.App.Messenger.Service.GroupMembershipService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
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
@RequestMapping("/api/group/membership")
public class GroupMembershipController {
    @Autowired
    private GroupMembershipService groupMembershipService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(GroupMembershipController.class);

    @GetMapping("/all")
    public ResponseEntity<List<GroupMembership>> findAllGroupMemberships() {
        try {
            LOG.info("findAllGroupMemberships()- groupMembership - Successful.");
            return ResponseEntity.ok(groupMembershipService.findAllGroupMemberships());
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllGroupMemberships(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Void> postCreateGroupMembership(@RequestBody @Valid GroupMembership groupMembership) {
        try {
            this.groupMembershipService.postCreateGroupMembership(groupMembership);
            LOG.info("postCreateGroupMembership() - user - Successful.");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.info("Failed to retrieve postCreateGroupMembership(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

}
