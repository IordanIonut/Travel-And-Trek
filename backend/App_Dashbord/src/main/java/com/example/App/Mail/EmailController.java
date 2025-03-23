package com.example.App.Mail;


import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @GetMapping("/sendEmail/reset")
    public void sendEmailChangePassword(@RequestParam("email") String email) throws MessagingException, IOException {
        emailService.sendEmailChangePassword(email);
    }
}