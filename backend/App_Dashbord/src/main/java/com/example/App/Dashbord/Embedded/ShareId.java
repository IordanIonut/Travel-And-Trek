package com.example.App.Dashbord.Embedded;

import com.example.App.Dashbord.Enum.ShareEnum;
import jakarta.persistence.*;
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
public class ShareId implements Serializable {
    @Column(name = "ID")
    private String id;
    @Column(name = "TYPE")
    @Enumerated(EnumType.STRING)
    private ShareEnum type;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ShareId)) return false;
        ShareId shareId = (ShareId) o;
        return id.equals(shareId.id) && type == shareId.type;
    }

    @Override
    public int hashCode() {
        return 31 * id.hashCode() + type.hashCode();
    }
}
