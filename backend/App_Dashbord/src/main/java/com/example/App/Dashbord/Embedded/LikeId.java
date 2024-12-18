package com.example.App.Embedded;

import com.example.App.Enum.LikeContentEnum;
import com.example.App.Enum.LikeEnum;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@Embeddable
public class LikeId implements Serializable {
    @Column(name = "ID")
    private Long id;
    @Column(name = "TYPE")
    @Enumerated(EnumType.STRING)
    private LikeEnum type;
    @Column(name ="CONTENT")
    @Enumerated(EnumType.STRING)
    private LikeContentEnum content;
}
