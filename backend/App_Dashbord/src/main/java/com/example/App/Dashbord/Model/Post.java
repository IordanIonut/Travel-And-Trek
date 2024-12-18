package com.example.App.Model;

import com.example.App.Embedded.PostId;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "POSTS", indexes = {
        @Index(name = "index_post_id", columnList = "ID, TYPE"),
        @Index(name = "index_post_media", columnList = "POST_ID_POST, POST_TYPE_POST, MEDIA_ID_MEDIA, MEDIA_TYPE_MEDIA"),
        @Index(name = "index_post_tag", columnList = "POST_ID_POST, POST_TYPE_POST, HASHTAG_ID"),
        @Index(name = "idx_post_tags", columnList = "POST_ID, USER_ID")
})
public class Post {
    @EmbeddedId
    private PostId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User post_user_id;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "POST_MEDIA",
            joinColumns = {
                    @JoinColumn(name = "POST_ID_POST", referencedColumnName = "id"),
                    @JoinColumn(name = "POST_TYPE_POST", referencedColumnName = "type")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "MEDIA_ID_MEDIA", referencedColumnName = "id"),
                    @JoinColumn(name = "MEDIA_TYPE_MEDIA", referencedColumnName = "type")
            }
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "media_user_id"})
    private List<Media> post_medias_id;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "POST_HASHTAG",
            joinColumns = {
                    @JoinColumn(name = "POST_ID_POST", referencedColumnName = "id"),
                    @JoinColumn(name = "POST_TYPE_POST", referencedColumnName = "type")
            },
            inverseJoinColumns = @JoinColumn(name = "HASHTAG_ID", referencedColumnName = "id")
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<Hashtag> post_hashtag_id;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "POST_TAGS",
            joinColumns = {
                    @JoinColumn(name = "POST_ID_POST", referencedColumnName = "id"),
                    @JoinColumn(name = "POST_TYPE_POST", referencedColumnName = "type")
            },
            inverseJoinColumns = @JoinColumn(name = "USER_ID"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<User> tagged_users;

    @Column(name = "DESCRIPTION", nullable = false)
    private String description;

    @Column(name = "VISIBILY", nullable = false)
    private Boolean visible;

    @Column(name = "CREATE_AT", nullable = false)
    private LocalDateTime create_at;

    @Column(name = "UPDATE_AT", nullable = false)
    private LocalDateTime update_at;
}
