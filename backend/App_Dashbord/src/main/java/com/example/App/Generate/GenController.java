package com.example.App.Generate;

import com.example.App.Dashbord.Controller.CommentController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/location")
public class GenController {
    private final GenService genService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(GenController.class);

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
            LOG.error("getGeocode() - No results found.");
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
            LOG.error("getGeocodeFormatted() - No results found.");
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
            LOG.error("getLocation()- location - No results found.");
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

    @PostMapping("/groups")
    public ResponseEntity<Void> postGroup(@RequestParam(value = "num", defaultValue = "1") final int number){
        try {
            genService.generateFakeGroup(number / 2);
            LOG.info("postGroup() - location - Successful");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }catch (Exception e){
            LOG.error("Error posting group "+ e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/group/memberships")
    public ResponseEntity<Void> postGroupMembership(@RequestParam(value = "num", defaultValue = "1") final int number){
        try {
            genService.generateFakeGroupMembers(number / 2);
            LOG.info("postGroupMembership() - location - Successful");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }catch (Exception e){
            LOG.error("Error posting group membership "+ e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/messages")
    public ResponseEntity<Void> postMessage(@RequestParam(value = "num", defaultValue = "1")final int number){
        try {
            genService.generateFakeMessage(number);
            LOG.info("postMessage() - location - Successful");
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (Exception e){
            LOG.error("Error posting message "+ e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/message/read/status")
    public ResponseEntity<Void> postMessageReadStatus(@RequestParam(value = "num", defaultValue = "1")final int number){
        try {
            genService.generateFakeMessageReadStatus(number);
            LOG.info("postMessageReadStatus() - location - Successful");
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (Exception e){
            LOG.error("Error posting message "+ e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/hobby")
    public ResponseEntity<Void> postHobby(@RequestParam(value = "num", defaultValue = "1") final int number){
        try {
            genService.generateFakeHobby(number);
            LOG.info("postHobby() - location - Successful");
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (Exception e){
            LOG.error("Error posting message "+ e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/journal")
    public ResponseEntity<Void> postJournal(@RequestParam(value = "num", defaultValue = "1") final int number){
        try {
            genService.generateFakeJournal(number);
            LOG.info("postJournal() - location - Successful");
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (Exception e){
            LOG.error("Error posting message "+ e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/travel/destination")
    public ResponseEntity<Void> postTravelDestination(@RequestParam(value = "num", defaultValue = "1") final int number){
        try {
            genService.generateFakeTravelDestination(number);
            LOG.info("postTravelDestination() - location - Successful");
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (Exception e){
            LOG.error("Error posting message "+ e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/all")
    public ResponseEntity<Void> postAll(@RequestParam(value = "num", defaultValue = "1") final int number) {
        try {
            LOG.info("------------START------------");
            long startTime = System.currentTimeMillis();
            genService.generateFakeTag(number / 10);
            genService.generateFakeUser(number/ 5);
            genService.generateFakeGroup(number / 5);
            genService.generateFakeHobby(number);
            genService.generateFakeTravelDestination(number);
            genService.generateFakeJournal(number);
            genService.generateFakeMedia(number);
            genService.generateFakePost(number);
            genService.generateFakeStory(number);
            genService.generateFakeComment(number);
            genService.generateFakeShare(number);
            genService.generateFakeFollower(number);
            genService.generateFakeLike(number);
            genService.generateFakeHighlight(number);
            genService.generateFakeMessage(number);
            genService.generateFakeMessageReadStatus(number);
            genService.generateFakeGroupMembers(number);
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            long hours = duration / (1000 * 60 * 60);
            long minutes = (duration % (1000 * 60 * 60)) / (1000 * 60);
            long seconds = (duration % (1000 * 60)) / 1000;

            String formattedDuration = String.format("%02d:%02d:%02d", hours, minutes, seconds);
            LOG.warn("All()- location - Successful....." + formattedDuration);
            LOG.info("");
            LOG.info("");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.error("Error posting all: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
