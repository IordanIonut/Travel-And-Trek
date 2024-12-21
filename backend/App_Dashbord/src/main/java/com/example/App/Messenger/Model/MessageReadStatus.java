package com.example.App.Messenger.Model;

import com.example.App.Dashbord.Model.User;
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
@Table(name = "MESSAGE_READ_STATUS", indexes = {
        @Index(name = "index_message_id_read_status", columnList = "MESSAGE_ID_MESSAGE_READ_STATUS, MESSAGE_TYPE_MESSAGE_READ_STATUS"),
        @Index(name = "index_user_id_read_status", columnList = "USER_ID_MESSAGE_READ_STATUS")
})
public class MessageReadStatus {
    @Id
    @Column(name = "ID", nullable = false)
    private String  id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "MESSAGE_ID_MESSAGE_READ_STATUS", referencedColumnName = "id", nullable = false),
            @JoinColumn(name = "MESSAGE_TYPE_MESSAGE_READ_STATUS", referencedColumnName = "type", nullable = false)
    })
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Message message_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID_MESSAGE_READ_STATUS", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user_id;

    @Column(name = "IS_READ", nullable = false)
    private Boolean is_read;

    @Column(name = "READ_AT", nullable = false)
    private LocalDateTime read_at;
}
