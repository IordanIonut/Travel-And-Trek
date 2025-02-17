package com.example.App.Dashbord.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "HIGHLIGHTS", indexes = {
        @Index(name = "index_highlight_id", columnList = "ID"),
        @Index(name = "index_highlight_user", columnList = "USER_ID"),
//        @Index(name = "index_highlight_medias", columnList = "MEDIA_ID_MEDIA, MEDIA_TYPE_MEDIA, HIGHLIGHT_ID"),
        @Index(name = "idx_highlight_create_at", columnList = "CREATE_AT"),
        @Index(name = "idx_highlight_update_at", columnList = "UPDATE_AT"),
})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Cacheable
public class Highlight {
    @Id
    @Column(name = "ID", nullable = false)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "id", nullable = false)
    @JsonIgnore
    private User highlight_user_id;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "HIGHLIGHT_MEDIA",
            joinColumns = @JoinColumn(name = "HIGHLIGHT_ID", referencedColumnName = "id"),
            inverseJoinColumns = {
                    @JoinColumn(name = "MEDIA_ID_MEDIA", referencedColumnName = "id"),
                    @JoinColumn(name = "MEDIA_TYPE_MEDIA", referencedColumnName = "type")
            }
    )
    @JsonIgnoreProperties({ "media_user_id"})
    private List<Media> highlight_medias;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "IMAGE", nullable = false)
    private String image;

    @Column(name = "VISIBILITY", nullable = false)
    private Boolean visibility;

    @Column(name = "CREATE_AT", nullable = false)
    private LocalDateTime created_at;

    @Column(name = "UPDATE_AT", nullable = false)
    private LocalDateTime updated_at;
}
