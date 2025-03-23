package com.example.App.Mail;

import com.example.App.Authentication.JWT;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.IOException;
import java.util.Random;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;
    @Autowired
    private JWT jwt;
    @Autowired
    private TemplateEngine templateEngine;

    public void sendEmailChangePassword(String email) throws MessagingException, IOException {
        int randomNumber = 100000 + new Random().nextInt(900000);

        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);

        messageHelper.setTo(email);
        messageHelper.setSubject("Change password Travel&Trek");
        messageHelper.setFrom("Travel&Trek@support.com");

        Context context = new Context();
        context.setVariable("code", randomNumber);
        context.setVariable("email", email);
        context.setVariable("link", "http://localhost:4200/authentication/change-password?token="+jwt.generateTokenCode(randomNumber+"",email));
        String emailContent = templateEngine.process("reset.html", context);
        messageHelper.setText(emailContent, true);

//        ClassPathResource resource = new ClassPathResource("static/images/Logo.jpg");
//        byte[] imageBytes = IOUtils.toByteArray(resource.getInputStream());
//
//        messageHelper.addInline("logo", new ByteArrayResource(imageBytes), "image/jpeg");

        emailSender.send(mimeMessage);
    }
}
