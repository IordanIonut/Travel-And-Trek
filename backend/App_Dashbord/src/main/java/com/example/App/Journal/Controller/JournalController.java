package com.example.App.Journal.Controller;

import com.example.App.Journal.Model.Journal;
import com.example.App.Journal.Service.JournalService;
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
@RequestMapping("/api/journal")
public class JournalController {
    @Autowired
    private JournalService journalService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(JournalController.class);

    @GetMapping("/all")
    public ResponseEntity<List<Journal>> findAllJournal() {
        try {
            LOG.info("findAllJournal()- journal - Successful.");
            return ResponseEntity.ok(journalService.findAllJournal());
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllJournal(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

}
