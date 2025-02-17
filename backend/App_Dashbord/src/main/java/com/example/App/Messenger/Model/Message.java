package com.example.App.Messenger.Model;

import com.example.App.Dashbord.Model.Post;
import com.example.App.Dashbord.Model.Story;
import com.example.App.Dashbord.Model.User;
import com.example.App.Messenger.Embedded.MessagesId;
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
@Table(name = "MESSAGES", indexes = {
        @Index(name = "index_id_message", columnList = "ID, TYPE"),
        @Index(name = "index_sender_id_message", columnList = "SENDER_ID_MESSAGE"),
        @Index(name = "index_recipient_id_message", columnList = "RECIPIENT_ID_MESSAGE"),
        @Index(name = "index_post_message", columnList = "POST_ID_MESSAGE, POST_TYPE_MESSAGE"),
        @Index(name = "index_story_message", columnList = "STORY_ID_MESSAGE"),
        @Index(name = "index_group_message", columnList = "GROUP_ID_MESSAGE"),
        @Index(name = "idx_message_create_at", columnList = "CREATED_AT"),
        @Index(name = "idx_message_update_at", columnList = "UPDATED_AT"),
})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Cacheable
public class Message {
    @EmbeddedId
    private MessagesId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SENDER_ID_MESSAGE", referencedColumnName = "id", nullable = false)
    private User sender_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RECIPIENT_ID_MESSAGE", referencedColumnName = "id", nullable = false)
    private User recipient_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({@JoinColumn(name = "POST_ID_MESSAGE", referencedColumnName = "id"),
            @JoinColumn(name = "POST_TYPE_MESSAGE", referencedColumnName = "type")})
    private Post post_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STORY_ID_MESSAGE", referencedColumnName = "id")
    private Story story_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GROUP_ID_MESSAGE", referencedColumnName = "id")
    private Group group_id;

    @Column(name = "CONTENT", nullable = false)
    private String content;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime created_at;

    @Column(name = "UPDATED_AT", nullable = false)
    private LocalDateTime updated_at;
}
