package com.example.App_Dashbord.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Entity
@Table(name = "MEDIA")
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "USER_ID", nullable = false)
    private Long user_id;
    @Column(name = "URL", nullable = false)
    private String url;
    @Column(name = "TYPE", nullable = false)
    private String type;
    @Column(name = "CREATE_AT", nullable = false)
    private LocalDate create_at;
}
