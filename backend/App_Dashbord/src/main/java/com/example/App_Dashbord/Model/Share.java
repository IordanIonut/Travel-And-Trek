package com.example.App_Dashbord.Model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Entity
@Table(name = "STORES")
public class Share {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "USER_ID", nullable = false)
    private Long user_id;
    @Column(name = "USER_ID_SHARED", nullable = false)
    private Long user_id_sharled;
    @Column(name = "POST_ID", nullable = false)
    private Long post_id;
    @Column(name = "DESCRIPTION", nullable = false)
    private String description;
}
