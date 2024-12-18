package com.example.App.Controller;

import com.example.App.Model.Media;
import com.example.App.Service.MediaService;
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
@RequestMapping("/api/media")
public class MediaController {
    @Autowired
    private MediaService mediaService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(MediaController.class);

    @GetMapping("/all")
    public ResponseEntity<List<Media>> findAllMedias() {
        try {
            List<Media> list = mediaService.findAllMedias();
            LOG.info("findAllMedias()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllMedias(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/all/users")
    public ResponseEntity<List<Long>> getFindAllUserIdMedia() {
        try {
            List<Long> list = mediaService.findAllUserIdMedia();
            LOG.info("getFindAllUserIdMedia()- media - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllUserIdMedia(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/all/media/by/user")
    public ResponseEntity<List<Media>> getFindAllMediaByUserId(@RequestParam("user_id") final Long user_id) {
        try {
            List<Media> list = mediaService.findAllMediaByUserId(user_id);
            LOG.info("findAllMediaByUserId()- media - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllMediaByUserId(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }
}
