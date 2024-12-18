package com.example.App.Dashbord.Embedded;

import com.example.App.Dashbord.Enum.FollowerStatusEnum;
import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FollowerId implements Serializable {
    @Column(name = "ID")
    private Long id;
    @Column(name = "STATUS", nullable = false)
    @Enumerated(EnumType.STRING)
    private FollowerStatusEnum status;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FollowerId)) return false;
        FollowerId followerId = (FollowerId) o;
        return id.equals(followerId.id) && status == followerId.status;
    }

    @Override
    public int hashCode() {
        return 31 * id.hashCode() + status.hashCode();
    }
}
