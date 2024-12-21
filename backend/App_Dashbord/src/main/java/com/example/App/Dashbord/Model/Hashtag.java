package com.example.App.Dashbord.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "HASHTAGS")
public class Hashtag {
    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "NAME", nullable = false, unique = true)
    private String name;

}
