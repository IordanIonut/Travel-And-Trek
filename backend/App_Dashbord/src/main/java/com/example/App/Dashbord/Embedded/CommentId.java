package com.example.App.Dashbord.Embedded;

import com.example.App.Dashbord.Enum.CommentEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.io.Serializable;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
@Embeddable
@EqualsAndHashCode
public class CommentId implements Serializable {
    @Column(name = "ID")
    private String id;
    @Column(name = "TYPE")
    @Enumerated(EnumType.STRING)
    private CommentEnum type;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CommentId)) return false;
        CommentId commentId = (CommentId) o;
        return id.equals(commentId.id) && type == commentId.type;
    }


}
