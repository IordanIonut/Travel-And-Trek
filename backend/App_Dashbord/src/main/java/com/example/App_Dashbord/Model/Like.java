package com.example.App_Dashbord.Model;

import com.example.App_Dashbord.Embedded.LikeId;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Entity
@Table(name = "LIKES", indexes = {
        @Index(name = "index_like_id", columnList = "ID, TYPE, CONTENT"),
        @Index(name ="index_like_user", columnList = "USER_ID"),
        @Index(name = "index_like_media", columnList = "MEDIA_ID_LIKE, MEDIA_TYPE_LIKE"),
        @Index(name = "index_like_post", columnList = "POST_ID_LIKE, POST_TYPE_LIKE"),
        @Index(name = "index_like_comment", columnList = "COMMENT_ID_LIKE, COMMENT_TYPE_LIKE")
})
public class Like {
    @EmbeddedId
    private LikeId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User like_user_id;

    //media
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "MEDIA_ID_LIKE", referencedColumnName = "id"),
            @JoinColumn(name = "MEDIA_TYPE_LIKE", referencedColumnName = "type")
    })
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Media like_media_id;

    //post
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "POST_ID_LIKE", referencedColumnName = "id"),
            @JoinColumn(name = "POST_TYPE_LIKE", referencedColumnName = "type")
    })
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Post like_post_id;

    //comment
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "COMMENT_ID_LIKE", referencedColumnName = "id"),
            @JoinColumn(name = "COMMENT_TYPE_LIKE", referencedColumnName = "type")
    })
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Comment like_comment_id;

    @Column(name = "CREATE_AT", nullable = false)
    private LocalDateTime create_at;
}
