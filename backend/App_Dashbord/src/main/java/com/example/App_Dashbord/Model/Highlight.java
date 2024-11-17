package com.example.App_Dashbord.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "HIGHLIGHTS")
public class Highlight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "USER_ID", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user_id;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "HIGHLIGHT_MEDIA",
            joinColumns = @JoinColumn(name = "HIGHLIGHT_ID", referencedColumnName = "id"),
            inverseJoinColumns = {
                    @JoinColumn(name = "MEDIA_ID_MEDIA", referencedColumnName = "id"),
                    @JoinColumn(name = "MEDIA_TYPE_MEDIA", referencedColumnName = "type")
            }
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<Media> medias;
}
