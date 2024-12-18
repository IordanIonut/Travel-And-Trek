package com.example.App.Model;

import com.example.App.Embedded.FollowerId;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Entity
@Table(name = "FOLLOWERS", indexes = {
        @Index(name = "index_follower_id", columnList = "ID, STATUS"),
        @Index(name = "index_follower_user", columnList = "USER_ID"),
        @Index(name = "index_follower_user_id", columnList = "USER_ID_FOLLOWER")
})
public class Follower {
    @EmbeddedId
    private FollowerId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User follower_user_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID_FOLLOWER", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User follower_user_id_follower;

    @Column(name = "CREATE_AT", nullable = false)
    private LocalDateTime created_at;
}
