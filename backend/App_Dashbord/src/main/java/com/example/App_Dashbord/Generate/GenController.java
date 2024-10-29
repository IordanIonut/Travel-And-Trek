package com.example.App_Dashbord.Generate;

import com.example.App_Dashbord.Controller.CommentController;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/location")
public class GenController {
    private final GenService genService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(CommentController.class);

    @Autowired
    public GenController(GenService genService) {
        this.genService = genService;
    }

    @GetMapping("/geocode")
    public ResponseEntity<Map<String, Object>> getGeocode() {
        Optional<Map<String, Object>> geocodeDataOpt = genService.getGeoCode();
        if (geocodeDataOpt.isPresent()) {
            LOG.info("getGeocode() - Successful geocoding result retrieved.");
            return ResponseEntity.ok(geocodeDataOpt.get());
        } else {
            LOG.warn("getGeocode() - No results found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "No results found"));
        }
    }

    @GetMapping("/geocode/formatted")
    public ResponseEntity<String> getGeocodeFormatted() {
        Optional<String> geocodeDataOpt = genService.getGeoCodeFormatted();
        if (geocodeDataOpt.isPresent()) {
            LOG.info("getGeocodeFormatted() - Successful geocoding result retrieved.");
            return ResponseEntity.ok(geocodeDataOpt.get());
        } else {
            LOG.warn("getGeocodeFormatted() - No results found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No results found");
        }
    }
}
