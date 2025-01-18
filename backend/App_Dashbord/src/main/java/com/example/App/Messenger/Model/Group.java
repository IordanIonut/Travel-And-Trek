package com.example.App.Messenger.Model;

import jakarta.persistence.*;
import lombok.*;
import org.checkerframework.checker.units.qual.C;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "USER_GROUPS", indexes = {
        @Index(name = "index_group_id", columnList = "ID")
})
public class Group {
    @Id
    @Column(name = "ID", nullable = false)
    private String  id;

    @Column(name = "NAME", nullable = false, unique = true)
    private String name;

    @Column(name = "DESCRIPTION", nullable = false)
    private String description;

    @Column(name = "URL", nullable = false)
    private String url;

    @Column(name = "CREATE_AT", nullable = false)
    private LocalDateTime create_at;

    @Column(name = "UPDATED_AT", nullable = false)
    private LocalDateTime updated_at;
}
