package com.example.App.Messenger.Controller;

import com.example.App.Messenger.Model.MessageReadStatus;
import com.example.App.Messenger.Service.MessageReadStatusService;
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
}
