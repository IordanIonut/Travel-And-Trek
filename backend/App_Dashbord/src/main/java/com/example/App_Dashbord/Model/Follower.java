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
@Table(name = "FOLLOWERS")
public class Follower {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "USER_ID", nullable = false)
    private Long user_id;
    @Column(name = "USER_ID_FOLLOWER", nullable = false)
    private Long user_id_follower;
    @Column(name = "STATUS", nullable = false)
    private Long status;
    @Column(name = "CREATE_AT", nullable = false)
    private LocalDate created_at;
}
