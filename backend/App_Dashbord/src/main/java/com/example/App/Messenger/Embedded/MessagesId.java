package com.example.App.Messenger.Embedded;

import com.example.App.Messenger.Enum.MessageEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class MessagesId {
    @Column(name = "ID")
    private String  id;
    @Column(name = "TYPE")
    @Enumerated(EnumType.STRING)
    private MessageEnum type;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MessagesId)) return false;
        MessagesId groupMembershipId = (MessagesId) o;
        return id.equals(groupMembershipId.id) && type == groupMembershipId.type;
    }

    @Override
    public int hashCode() {
        return 31 * id.hashCode() + type.hashCode();
    }

}
