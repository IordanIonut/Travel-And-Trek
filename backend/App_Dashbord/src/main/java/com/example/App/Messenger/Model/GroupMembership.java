package com.example.App.Messenger.Model;

import com.example.App.Dashbord.Embedded.PostId;
import com.example.App.Dashbord.Model.User;
import com.example.App.Messenger.Embedded.GroupMembershipId;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Entity
@Table(name = "GROUP_MEMBERSHIPS", indexes = {
        @Index(name = "index_id_group_membership", columnList = "ID, ROLE"),
        @Index(name = "index_group_id_membership", columnList = "GROUP_ID_GROUP_MEMBERSHIP"),
        @Index(name = "index_user_id_group_membership", columnList = "USER_ID_MEMBERHIP")
})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Cacheable
public class GroupMembership {
    @EmbeddedId
    private GroupMembershipId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GROUP_ID_GROUP_MEMBERSHIP", referencedColumnName = "id", nullable = false)
    private Group group_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID_MEMBERHIP", referencedColumnName = "id", nullable = false)
    private User user_id;

    @Column(name = "JOINED_AT", nullable = false)
    private LocalDateTime joined_at;
}
