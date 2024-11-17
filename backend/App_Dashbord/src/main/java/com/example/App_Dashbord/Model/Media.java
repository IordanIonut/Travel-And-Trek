package com.example.App_Dashbord.Model;

import com.example.App_Dashbord.Embedded.MediaId;
import com.example.App_Dashbord.Enum.MediaEnum;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Entity
@Table(name = "MEDIA", indexes = {
        @Index(name = "index_media_id", columnList = "ID, TYPE"),
        @Index(name = "index_media_user", columnList = "USER_ID")
})
public class Media {
    @EmbeddedId
    private MediaId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User media_user_id;

    @Column(name = "URL", nullable = false)
    private String url;

    @Column(name = "CREATE_AT", nullable = false)
    private LocalDateTime create_at;
}
