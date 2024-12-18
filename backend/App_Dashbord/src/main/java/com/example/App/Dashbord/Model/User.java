package com.example.App.Model;

import com.example.App.Enum.GenderEnum;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "USERS", indexes = {
        @Index(name = "index_user_name", columnList = "NAME"),
        @Index(name = "index_user_email", columnList = "EMAIL", unique = true),
        @Index(name = "index_user_gender", columnList = "GENDER"),
        @Index(name = "index_user_date_create", columnList = "DATE_CREATE"),
        @Index(name = "index_user_location", columnList = "LOCATION"),
        @Index(name = "index_user_tag", columnList = "USER_TAGS, USER_ID_POST")
})
public class User {
    @Id
    @Column(name = "ID", nullable = false)
    private Long id;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "USER_HASHTAG",
            joinColumns = {
                    @JoinColumn(name = "USER_ID_POST", referencedColumnName = "id"),
            },
            inverseJoinColumns = @JoinColumn(name = "TAG_ID", referencedColumnName = "id")
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<Hashtag> user_hashtag_id;

    @Column(name = "NAME", nullable = false, unique = true)
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
    private LocalDateTime date_create;

    @Column(name = "PROFILE_PICTURE", nullable = false)
    private String profile_picture;

    @Column(name = "GENDER", nullable = false)
    @Enumerated(EnumType.STRING)
    private GenderEnum gender;

    @Column(name = "DATE_OF_BIRTH", nullable = false)
    private LocalDate date_of_birth;

    @Column(name = "DATE_LAST_UPDATE", nullable = false)
    private LocalDateTime date_last_update;

    @Column(name = "QR_CODE", nullable = false)
    private String qr_code;
}
