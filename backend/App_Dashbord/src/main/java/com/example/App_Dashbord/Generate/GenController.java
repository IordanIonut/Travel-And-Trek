package com.example.App_Dashbord.Generate;

import com.example.App_Dashbord.Controller.CommentController;
import com.example.App_Dashbord.Model.User;
import com.example.App_Dashbord.Repository.UserRepository;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
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
            LOG.info("getGeocode()- location - Successful geocoding result retrieved.");
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
            LOG.info("getGeocodeFormatted()- location - Successful geocoding result retrieved.");
            return ResponseEntity.ok(geocodeDataOpt.get());
        } else {
            LOG.warn("getGeocodeFormatted() - No results found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No results found");
        }
    }

    @GetMapping("/geocode/location")
    public ResponseEntity<Map<String, Object>> getLocation() {
        Optional<Map<String, Object>> geocodeDataOpt = genService.getLocation();
        if (geocodeDataOpt.isPresent()) {
            LOG.info("getGeocode()- location - Successful geocoding result retrieved.");
            return ResponseEntity.ok(geocodeDataOpt.get());
        } else {
            LOG.warn("getLocation()- location - No results found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "No results found"));
        }
    }

    @PostMapping("/users")
    public ResponseEntity<Void> postUsers(@RequestParam(value = "num", defaultValue = "1") final int number) {
        try {
            genService.generateFakeUser(number);
            LOG.info("postUsers()- location - Successful.");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.error("Error posting stores: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/medias")
    public ResponseEntity<Void> postMedias(@RequestParam(value = "num", defaultValue = "1") final int number) {
        try {
            genService.generateFakeMedia(number);
            LOG.info("postMedias()- location - Successful.");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.error("Error posting stores: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/stores")
    public ResponseEntity<Void> postStores(@RequestParam(value = "num", defaultValue = "1") final int number) {
        try {
            genService.generateFakeStory(number);
            LOG.info("postStores()- location - Successful.");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.error("Error posting stores: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/posts")
    public ResponseEntity<Void> postPosts(@RequestParam(value = "num", defaultValue = "1") final int number) {
        try {
            genService.generateFakePost(number);
            LOG.info("postPosts()- location - Successful.");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.error("Error posting posts: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/comments")
    public ResponseEntity<Void> postComments(@RequestParam(value = "num", defaultValue = "1") final int number) {
        try {
            genService.generateFakeComment(number);
            LOG.info("postComments()- location - Successful.");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.error("Error posting comments: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/followers")
    public ResponseEntity<Void> postFollowers(@RequestParam(value = "num", defaultValue = "1") final int number) {
        try {
            genService.generateFakeFollower(number);
            LOG.info("postFollowers()- location - Successful.");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.error("Error posting followers: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/likes")
    public ResponseEntity<Void> postLikes(@RequestParam(value = "num", defaultValue = "1") final int number) {
        try {
            genService.generateFakeLike(number);
            LOG.info("postLikes()- location - Successful.");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.error("Error posting likes: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/shares")
    public ResponseEntity<Void> postShares(@RequestParam(value = "num", defaultValue = "1") final int number) {
        try {
            genService.generateFakeShare(number);
            LOG.info("postShares()- location - Successful.");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.error("Error posting share: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/highlights")
    public ResponseEntity<Void> postHighlight(@RequestParam(value = "num", defaultValue = "1") final int number) {
        try {
            genService.generateFakeHighlight(number);
            LOG.info("postHighlight()- location - Successful.");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.error("Error posting highlight: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/hashtags")
    public ResponseEntity<Void> postTag(@RequestParam(value = "num", defaultValue = "1") final int number) {
        try {
            genService.generateFakeTag(number);
            LOG.info("postTag()- location - Successful.");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.error("Error posting tag: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/all")
    public ResponseEntity<Void> postAll(@RequestParam(value = "num", defaultValue = "1") final int number) {
        try {
            genService.generateFakeTag(number / 10);
            genService.generateFakeUser(number / 50);
            genService.generateFakeMedia(number);
            genService.generateFakeStory(number);
            genService.generateFakePost(number);
            genService.generateFakeComment(number);
            genService.generateFakeShare(number);
            genService.generateFakeFollower(number);
            genService.generateFakeLike(number);
            genService.generateFakeHighlight(number);
            LOG.info("All()- location - Successful.");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.error("Error posting all: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
