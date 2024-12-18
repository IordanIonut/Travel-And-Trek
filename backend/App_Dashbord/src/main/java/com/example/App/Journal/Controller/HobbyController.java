package com.example.App.Journal.Controller;

import com.example.App.Journal.Model.Hobby;
import com.example.App.Journal.Service.HobbyService;
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
@RequestMapping("/api/hobby")
public class HobbyController {
    @Autowired
    private HobbyService hobbyService;

    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(HobbyController.class);

    @GetMapping("/all")
    public ResponseEntity<List<Hobby>> findAllHobby() {
        try {
            LOG.info("findAllHobby()- hobby - Successful.");
            return ResponseEntity.ok(hobbyService.findAllHobby());
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllHobby(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }


}
