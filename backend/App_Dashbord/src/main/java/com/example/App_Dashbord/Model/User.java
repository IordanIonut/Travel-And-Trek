package com.example.App_Dashbord.Model;

import com.example.App_Dashbord.Enum.GenderEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "USERS")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID", nullable = false)
    private Long id;
    @Column(name = "NAME", nullable = false)
    private String name;
    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;
    @Column(name = "LOCATION", nullable = false)
    private String Location;
    @Column(name = "PASSWORD", nullable = false)
    private String password;
    @Column(name = "BIO", nullable = false)
    private String bio;
    @Column(name = "DATE_CREATE", nullable = false)
    private LocalDate date_create;
    @Column(name = "PROFILE_PICTURE", nullable = false)
    private String profile_picture;
    @Column(name = "GENDER", nullable = false)
    private GenderEnum gender;
    @Column(name = "DATE_OF_BIRDTH", nullable = false)
    private LocalDate date_of_birth;
    @Column(name = "DATE_LAST_UPDATE", nullable = false)
    private LocalDate date_last_update;
    @Column(name = "QR_CODE", nullable = false)
    private String qr_code;
}
