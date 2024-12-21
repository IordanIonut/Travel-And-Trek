package com.example.App.Messenger.Controller;

import com.example.App.Messenger.Model.Message;
import com.example.App.Messenger.Service.MessageService;
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
@RequestMapping("/api/message")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(MessageController.class);

    @GetMapping("/all")
    public ResponseEntity<List<Message>> findAllMessage() {
        try {
            LOG.info("findAllMessage()- message - Successful.");
            return ResponseEntity.ok(messageService.findAllMessage());
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllMessage(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
}
