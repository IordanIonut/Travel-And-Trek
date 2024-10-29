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
@Table(name = "STORIES")
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "USER_ID", nullable = false)
    private Long user_id;
    @Column(name = "MEDIA_ID", nullable = false)
    private Long media_id;
    @Column(name = "CREATE_AT", nullable = false)
    private LocalDate create_at;
    @Column(name = "EXPIRATION_TIME", nullable = false)
    private LocalDate expiry_time;
    @Column(name = "EXPIRATION", nullable = false)
    private Boolean expiration;
}
