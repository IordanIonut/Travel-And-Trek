package com.example.App_Dashbord.Embedded;

import com.example.App_Dashbord.Enum.LikeContentEnum;
import com.example.App_Dashbord.Enum.LikeEnum;
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
