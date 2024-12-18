package com.example.App.Controller;

import com.example.App.Model.Highlight;
import com.example.App.Service.HighlightService;
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
@RequestMapping("/api/highlight")
public class HighlightController {
    @Autowired
    private HighlightService highlightService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(HighlightController.class);

    @GetMapping("/all")
    public ResponseEntity<List<Highlight>> findAll() {
        try {
            List<Highlight> list = highlightService.findAll();
            LOG.info("findAll()- highlight - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAll(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/find")
    public ResponseEntity<List<Highlight>> findAllHighlightsByUser(@RequestParam("name") final String name) {
        try {
            List<Highlight> list = highlightService.findAllHighlightsByUser(name);
            LOG.info("findAllHighlightsByUser()- highlight - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllHighlightsByUser(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }
}
