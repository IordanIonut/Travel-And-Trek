package com.example.App_Dashbord.Controller;

import com.example.App_Dashbord.Model.Share;
import com.example.App_Dashbord.Service.ShareService;
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
@RequestMapping("/api/share")
public class ShareController {
    @Autowired
    private ShareService shareService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(ShareController.class);

    @GetMapping("/all")
    public ResponseEntity<List<Share>> findAllShares() {
        try {
            List<Share> list = shareService.findAllShares();
            LOG.info("findAllShares()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllShares(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    @GetMapping("/find")
    public ResponseEntity<List<Share>> findAllSharesByUser(@RequestParam("name") final String name, @RequestParam("index") final int index, @RequestParam("number") final int number) {
        try {
            List<Share> list = shareService.findAllSharesByUser(name, index, number);
            LOG.info("findAllSharesByUser()- user - Successful.");
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            LOG.info("Failed to retrieve findAllSharesByUser(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }
}
