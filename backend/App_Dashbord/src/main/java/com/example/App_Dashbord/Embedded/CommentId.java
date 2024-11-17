package com.example.App_Dashbord.Embedded;

import com.example.App_Dashbord.Enum.CommnetEnum;
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
public class CommentId implements Serializable {
    @Column(name = "ID")
    private Long id;
    @Column(name = "TYPE")
    @Enumerated(EnumType.STRING)
    private CommnetEnum type;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CommentId)) return false;
        CommentId commentId = (CommentId) o;
        return id.equals(commentId.id) && type == commentId.type;
    }

    @Override
    public int hashCode() {
        return 31 * id.hashCode() + type.hashCode();
    }
}
