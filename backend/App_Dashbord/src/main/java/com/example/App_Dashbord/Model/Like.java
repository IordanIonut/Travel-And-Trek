package com.example.App_Dashbord.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Entity
@Table(name = "LIKES")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LIKE_ID")
    private Long id;
    @Column(name = "USER_ID", nullable = false)
    private Long user_id;
    @Column(name = "POST_ID", nullable = false)
    private Long post_id;
    @Column(name = "CONTENT", nullable = false)
    private String content;
    @Column(name = "TYPE", nullable = false)
    private String type;
    @Column(name="CREATE_AT", nullable = false)
    private LocalDate create_at;
}
