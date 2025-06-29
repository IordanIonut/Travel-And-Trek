package com.example.App.Dashbord.Model;

import com.example.App.Dashbord.Embedded.PostId;
import com.example.App.Messenger.Model.Group;
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
//        @Index(name = "index_post_media", columnList = "POST_ID_POST, POST_TYPE_POST, MEDIA_ID_MEDIA, MEDIA_TYPE_MEDIA"),
//        @Index(name = "index_post_tag", columnList = "POST_ID_POST, POST_TYPE_POST, HASHTAG_ID"),
        @Index(name = "idx_post_user", columnList = "USER_ID"),
        @Index(name = "idx_post_group", columnList = "GROUP_ID"),
        @Index(name = "idx_post_create_at", columnList = "CREATE_AT"),
        @Index(name = "idx_post_update_at", columnList = "UPDATE_AT"),
})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Cacheable
public class Post {
    @EmbeddedId
    private PostId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "id")
    private User post_user_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GROUP_ID", referencedColumnName = "id")
    private Group post_group_id;

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
    @JsonIgnoreProperties({"media_user_id"})
    private List<Media> post_medias_id;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "POST_HASHTAG",
            joinColumns = {
                    @JoinColumn(name = "POST_ID_POST", referencedColumnName = "id"),
                    @JoinColumn(name = "POST_TYPE_POST", referencedColumnName = "type")
            },
            inverseJoinColumns = @JoinColumn(name = "HASHTAG_ID", referencedColumnName = "id")
    )
    private List<Hastag> post_hashtag_id;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "POST_TAGS",
            joinColumns = {
                    @JoinColumn(name = "POST_ID_POST", referencedColumnName = "id"),
                    @JoinColumn(name = "POST_TYPE_POST", referencedColumnName = "type")
            },
            inverseJoinColumns = @JoinColumn(name = "USER_ID"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<User> tagged_users;

    @Column(name = "DESCRIPTION", nullable = false ,columnDefinition = "TEXT")
    private String description;

    @Column(name = "VISIBILY", nullable = false)
    private Boolean visible;

    @Column(name = "CREATE_AT", nullable = false)
    private LocalDateTime create_at;

    @Column(name = "UPDATE_AT", nullable = false)
    private LocalDateTime update_at;
}
