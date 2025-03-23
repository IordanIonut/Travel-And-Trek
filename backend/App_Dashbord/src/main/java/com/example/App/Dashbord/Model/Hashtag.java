package com.example.App.Dashbord.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "HASHTAGS")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Cacheable
public class Hashtag {
    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "NAME", nullable = false)
    private String name;

}
