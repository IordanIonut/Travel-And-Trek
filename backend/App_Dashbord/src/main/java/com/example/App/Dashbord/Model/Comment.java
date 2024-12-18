package com.example.App.Dashbord.Model;

import com.example.App.Dashbord.Embedded.CommentId;
import com.example.App.Journal.Model.Journal;
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
@Table(name = "COMMENTS", indexes = {
        @Index(name = "index_comment_id", columnList = "ID, TYPE"),
        @Index(name = "index_comment_user", columnList = "USER_ID"),
        @Index(name = "index_journal_id", columnList = "JOURNAL_ID"),
        @Index(name = "index_comment_post", columnList = "POST_ID_COMMENT, POST_TYPE_COMMENT"),
        @Index(name = "index_comment_media", columnList = "MEDIA_ID_COMMENT, MEDIA_TYPE_COMMENT"),
        @Index(name ="index_comment_source", columnList = "SOURCE_ID_COMMENT, SOURCE_TYPE_COMMENT")
})
public class Comment {
    @EmbeddedId
    private CommentId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User comment_user_id;

    //post
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "POST_ID_COMMENT", referencedColumnName = "id"),
            @JoinColumn(name = "POST_TYPE_COMMENT", referencedColumnName = "type")
    })
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Post comment_post_id;

    //media
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "MEDIA_ID_COMMENT", referencedColumnName = "id"),
            @JoinColumn(name = "MEDIA_TYPE_COMMENT", referencedColumnName = "type")
    })
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Media comment_media_id;

    //journal
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "JOURNAL_ID_COMMENT", referencedColumnName = "id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Journal comment_journal_id;

    @Column(name = "MESSAGE", nullable = false)
    private String message;

    @Column(name = "CREATE_AT", nullable = false)
    private LocalDateTime create_at;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "SOURCE_ID_COMMENT", referencedColumnName = "id"),
            @JoinColumn(name = "SOURCE_TYPE_COOMENT", referencedColumnName = "type")
    })
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Comment comment_source_id;
}
