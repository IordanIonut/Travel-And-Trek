package com.example.App.Dashbord.Model;

import com.example.App.Dashbord.Embedded.ShareId;
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
@Table(name = "SHARES", indexes = {
        @Index(name = "index_share_id_type", columnList = "ID, TYPE"),
        @Index(name = "index_share_user_id", columnList = "USER_ID"),
        @Index(name = "index_share_user_id_sharled", columnList = "USER_ID_SHARED"),
        @Index(name = "index_share_id_type_share", columnList = "MEDIA_ID_SHARE, MEDIA_TYPE_SHARE"),
        @Index(name = "index_share_id_type_post", columnList = "POST_ID_SHARE, POST_TYPE_SHARE"),
        @Index(name = "index_share_story_post", columnList = "STORY_ID_SHARE"),
        @Index(name = "idx_share_create_at", columnList = "CREATE_AT"),
        @Index(name = "idx_share_update_at", columnList = "UPDATE_AT"),
})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Cacheable
public class Share {
    @EmbeddedId
    private ShareId shareId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "id", nullable = false)
    private User share_user_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID_SHARED", nullable = false)
    private User share_user_id_sharled;

    //media
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "MEDIA_ID_SHARE", referencedColumnName = "id"),
            @JoinColumn(name = "MEDIA_TYPE_SHARE", referencedColumnName = "type")
    })
    @JsonIgnoreProperties({ "media_user_id"})
    private Media share_media_id;

    //post
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "POST_ID_SHARE", referencedColumnName = "id"),
            @JoinColumn(name = "POST_TYPE_SHARE", referencedColumnName = "type")
    })
    @JsonIgnoreProperties({"post_user_id"})
    private Post share_post_id;

    //story
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STORY_ID_SHARE", referencedColumnName = "id", nullable = true)
    @JsonIgnoreProperties({ "story_user_id"})
    private Story share_story_id;

    @Column(name = "DESCRIPTION", nullable = false)
    private String description;

    @Column(name = "CREATE_AT", nullable = false)
    private LocalDateTime create_at;

    @Column(name = "UPDATE_AT", nullable = false)
    private LocalDateTime update_at;
}
