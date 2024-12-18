package com.example.App.Journal.Model;

import com.example.App.Dashbord.Model.Comment;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Entity
@Table(name = "TRAVEL_DESTINATIONS")
public class TravelDestination {
    @Id
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "COUNTRY", nullable = false)
    private String country;

    @Column(name = "DESCRIPTION", nullable = false)
    private String description;

//    @OneToMany(fetch = FetchType.LAZY)
//    @JoinColumn(name = "COMMENT_ID", referencedColumnName = "id", nullable = false)
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//    private List<Comment> comment_ids;
}
