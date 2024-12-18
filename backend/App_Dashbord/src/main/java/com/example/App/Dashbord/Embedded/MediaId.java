package com.example.App.Embedded;

import com.example.App.Enum.MediaEnum;
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
public class MediaId implements Serializable {
    @Column(name = "ID")
    private Long id;
    @Column(name = "TYPE")
    @Enumerated(EnumType.STRING)
    private MediaEnum type;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MediaId)) return false;
        MediaId mediaId = (MediaId) o;
        return id.equals(mediaId.id) && type == mediaId.type;
    }

    @Override
    public int hashCode() {
        return 31 * id.hashCode() + type.hashCode();
    }
}
