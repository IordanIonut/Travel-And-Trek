package com.example.App.Messenger.Embedded;

import com.example.App.Messenger.Enum.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class GroupMembershipId implements Serializable {
    @Column(name = "ID")
    private Long id;
    @Column(name = "ROLE")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof GroupMembershipId)) return false;
        GroupMembershipId groupMembershipId = (GroupMembershipId) o;
        return id.equals(groupMembershipId.id) && role == groupMembershipId.role;
    }

    @Override
    public int hashCode() {
        return 31 * id.hashCode() + role.hashCode();
    }

}
