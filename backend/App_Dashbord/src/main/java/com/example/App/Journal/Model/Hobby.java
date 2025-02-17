package com.example.App.Journal.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Cacheable
@Table( name = "HOBBYS")
public class Hobby {
    @Id
    @Column(name = "ID", nullable = false)
    private String id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "DESCRIPTION", nullable = false)
    private String description;
}
