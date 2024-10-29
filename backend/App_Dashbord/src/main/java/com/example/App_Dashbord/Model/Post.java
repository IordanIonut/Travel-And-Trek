package com.example.App_Dashbord.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "POSTS")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "USER_ID", nullable = false)
    private Long user_id;
    @Column(name = "DESCRIPTION", nullable = false)
    private String description;
    @Column(name = "MEDIA_ID", nullable = false)
    private String media_id;
    @Column(name = "VISIBILY", nullable = false)
    private Boolean visible;
    @Column(name = "TYPE", nullable = false)
    private String type;
    @Column(name = "CREATE_AT", nullable = false)
    private LocalDate create_at;
    @Column(name = "UPDATE_AT", nullable = false)
    private LocalDate update_at;
}
