package com.example.App.Journal.Controller;

import com.example.App.Journal.Model.TravelDestination;
import com.example.App.Journal.Service.TravelDestinationService;
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
@RequestMapping("/api/travel/destination")
public class TravelDestinationController {
    @Autowired
    private TravelDestinationService travelDestinationService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(TravelDestinationService.class);

    @GetMapping("all")
    public ResponseEntity<List<TravelDestination>> findAllTravelDestinations() {
        try {
            LOG.info("findAllTravelDestinations()- travelDestination - Successful.");
            return ResponseEntity.ok(travelDestinationService.findAllTravelDestinations());
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllTravelDestinations(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
}
