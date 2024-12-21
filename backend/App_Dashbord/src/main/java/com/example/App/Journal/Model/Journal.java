package com.example.App.Journal.Model;

import com.example.App.Dashbord.Model.Comment;
import com.example.App.Dashbord.Model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Entity
@Table(name = "JOURNALS", indexes = {
        @Index(name = "index_id_user_journal", columnList = "USER_ID"),
        @Index(name = "index_ids_comment_journal", columnList = "JOURNAL_ID_COMMENT, COMMENT_ID_COMMENT"),
        @Index(name = "index_ids_hobby_journal", columnList = "JOURNAL_ID_JOURNAL, HOBBY_ID_HOBBY"),
        @Index(name = "index_ids_travel_journal", columnList = "JOURNAL_TR_ID_TRAVEL, TRAVEL_ID_TRAVEL")
})
public class Journal {
    @Id
    @Column(name = "ID", nullable = false)
    private String id;

    @Column(name = "TITLE", nullable = false)
    private String tittle;

    @Column(name = "CONTENT", nullable = false)
    private String content;

    @Column(name = "CREATE_AT", nullable = false)
    private LocalDateTime create_at;

    @Column(name = "UPDATE_AT", nullable = false)
    private LocalDateTime update_at;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user_id;

//    @OneToMany(mappedBy = "journal_id", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//    private List<Comment> comments;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "JOURNAL_HOBBYS",
            joinColumns = {@JoinColumn(name = "JOURNAL_ID_JOURNAL", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "HOBBY_ID_HOBBY", referencedColumnName = "id")})
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<Hobby> hobby_ids;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "JOURNAL_TRAVEL_DESTIONATIONS",
            joinColumns = {@JoinColumn(name = "JOURNAL_TR_ID_TRAVEL", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "TRAVEL_ID_TRAVEL", referencedColumnName = "id")})
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<TravelDestination> travel_destination_ids;
}
