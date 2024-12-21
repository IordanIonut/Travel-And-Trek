package com.example.App.Messenger.Controller;

import com.example.App.Messenger.Model.MessageReadStatus;
import com.example.App.Messenger.Service.MessageReadStatusService;
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
@RequestMapping("/api/message/read/status")
public class MessageReadStatusController {
    @Autowired
    private MessageReadStatusService messageReadStatusService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(MessageReadStatusController.class);

    @GetMapping("/all")
    public ResponseEntity<List<MessageReadStatus>> findAllMessageReadStatus() {
        try {
            LOG.info("findAllMessageReadStatus()- messageReadStatus - Successful.");
            return ResponseEntity.ok(messageReadStatusService.findAllMessageReadStatus());
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllMessageReadStatus(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    @GetMapping("/contact")
    public ResponseEntity<List<MessageReadStatus>> findConversationsByUser(@RequestParam("name") final String name, @RequestParam("conversationType") final String conversationType) {
        try {
            LOG.info("findConversationsByUser()- message - Successful.");
            return ResponseEntity.ok(messageReadStatusService.findConversationsByUser(name, conversationType));
        } catch (Exception e) {
            LOG.info("Failed to retrieve findConversationsByUser(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    @GetMapping("/chat/person")
    public ResponseEntity<List<MessageReadStatus>> findMessageByUser(@RequestParam("recipient") final String recipient, @RequestParam("sender") final String sender) {
        try {
            LOG.info("findMessageByUser()- message - Successful.");
            return ResponseEntity.ok(messageReadStatusService.findMessageByUser(recipient, sender));
        } catch (Exception e) {
            LOG.info("Failed to retrieve findMessageByUser(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    @GetMapping("/chat/group")
    public ResponseEntity<List<MessageReadStatus>> findMessageReadStatusByGroup(@RequestParam("groupId") final String groupId) {
        try {
            LOG.info("findMessageReadStatusByGroup()- message - Successful.");
            return ResponseEntity.ok(messageReadStatusService.findMessageReadStatusByGroup(groupId));
        } catch (Exception e) {
            LOG.info("Failed to retrieve findMessageReadStatusByGroup(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
}
