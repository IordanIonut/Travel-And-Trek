package com.example.App.Messenger.Repository;

import com.example.App.Messenger.Model.MessageReadStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageReadStatusRepository extends JpaRepository<MessageReadStatus, Long> {
//    @Query("""
//    SELECT mrs
//    FROM MessageReadStatus mrs
//    JOIN mrs.message_id m
//    LEFT JOIN GroupMembership gm ON m.group_id.id = gm.group_id.id
//    WHERE
//        (m.sender_id.name = :name OR m.recipient_id.name = :name)
//        AND (
//            (:conversationType = 'peaples' AND m.group_id IS NULL)
//            OR (:conversationType = 'groups' AND m.group_id IS NOT NULL)
//            OR :conversationType = 'all'
//        )
//        AND m.created_at = (
//            SELECT MAX(sub.created_at)
//            FROM Message sub
//            WHERE
//                (sub.group_id.id = m.group_id.id AND m.group_id IS NOT NULL)
//                OR (
//                    (sub.sender_id.id = m.sender_id.id AND sub.recipient_id.id = m.recipient_id.id)
//                    OR (sub.sender_id.id = m.recipient_id.id AND sub.recipient_id.id = m.sender_id.id)
//                )
//        )
//    GROUP BY
//        CASE
//            WHEN m.group_id IS NULL THEN CONCAT(m.sender_id.id, '-', m.recipient_id.id)
//            ELSE m.group_id.id
//        END
//    ORDER BY m.created_at DESC
//""")
//    List<MessageReadStatus> findConversationsByUser(@Param("name") String name, @Param("conversationType") String conversationType);

    @Query("""
    SELECT mrs
    FROM MessageReadStatus mrs
    JOIN mrs.message_id m
    LEFT JOIN GroupMembership gm ON m.group_id.id = gm.group_id.id
    WHERE 
        (m.sender_id.name = :name OR m.recipient_id.name = :name)
        AND (
            (:conversationType = 'peaples' AND m.group_id IS NULL) 
            OR (:conversationType = 'groups' AND m.group_id IS NOT NULL)
            OR :conversationType = 'all'
        )
        AND m.created_at = (
            SELECT MAX(sub.created_at)
            FROM Message sub
            WHERE 
                (sub.group_id.id = m.group_id.id AND m.group_id IS NOT NULL)
                OR (
                    (sub.sender_id.id = m.sender_id.id AND sub.recipient_id.id = m.recipient_id.id)
                    OR (sub.sender_id.id = m.recipient_id.id AND sub.recipient_id.id = m.sender_id.id)
                )
        )
    GROUP BY 
        COALESCE(m.group_id.id, CONCAT(m.sender_id.id, '-', m.recipient_id.id))
    ORDER BY m.created_at DESC
""")
    List<MessageReadStatus> findConversationsByUser(@Param("name") String name, @Param("conversationType") String conversationType);



    @Query("""
            SELECT DISTINCT mrs FROM MessageReadStatus mrs INNER JOIN User u ON mrs.message_id.recipient_id.id = u.id
                INNER JOIN User u2 ON mrs.message_id.sender_id.id = u2.id
                WHERE (u.name = :recipient AND u2.name = :sender) OR (u2.name = :recipient AND u.name = :sender)
                ORDER BY mrs.message_id.created_at ASC
            """)
    List<MessageReadStatus> findMessageByUser(@Param("recipient") String recipient, @Param("sender") final String sender);

    @Query("SELECT DISTINCT mrs FROM MessageReadStatus mrs where mrs.message_id.group_id.id = :groupId ORDER BY mrs.message_id.created_at ASC")
    List<MessageReadStatus> findMessageReadStatusByGroup(@Param("groupId") String groupId);
}
