package com.example.App.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "STORIES", indexes = {
        @Index(name = "index_story_user_id", columnList = "USER_ID"),
        @Index(name = "index_story_media_id_type", columnList = "MEDIA_ID_STORY, MEDIA_TYPE_STORY"),
})
public class Story {
    @Id
    @Column(name = "ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User story_user_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "MEDIA_ID_STORY", referencedColumnName = "id", nullable = false),
            @JoinColumn(name = "MEDIA_TYPE_STORY", referencedColumnName = "type", nullable = false)
    })
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "media_user_id"})
    private Media story_media_id;

    @Column(name = "CREATE_AT", nullable = false)
    private LocalDateTime create_at;

    @Column(name = "EXPIRATION_TIME", nullable = false)
    private LocalDateTime expiration_time;

    @Column(name = "EXPIRATION", nullable = false)
    private Boolean expiration;
}
