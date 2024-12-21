package com.example.App.Messenger.Repository;

import com.example.App.Messenger.Model.MessageReadStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageReadStatusRepository extends JpaRepository<MessageReadStatus, Long> {
    @Query("""
            SELECT DISTINCT mrs FROM MessageReadStatus mrs JOIN mrs.message_id m
            LEFT JOIN GroupMembership gm ON m.group_id.id = gm.group_id.id
                AND (m.sender_id.id = gm.user_id.id OR m.recipient_id.id = gm.user_id.id)
            WHERE m.id IN (
                SELECT sub.id
                FROM Message sub
                WHERE
                    (sub.group_id.id = m.group_id.id AND m.group_id IS NOT NULL)
                    OR (
                        (sub.sender_id.name = :name AND sub.recipient_id.name <> :name)
                        OR
                        (sub.recipient_id.name = :name AND sub.sender_id.name <> :name)
                    )
                    AND sub.created_at = (
                        SELECT MAX(latest.created_at)
                        FROM Message latest
                        WHERE
                            (latest.group_id.id = sub.group_id.id AND sub.group_id IS NOT NULL)
                            OR (
                                (latest.sender_id.id = sub.sender_id.id AND latest.recipient_id.id = sub.recipient_id.id)
                                OR
                                (latest.sender_id.id = sub.recipient_id.id AND latest.recipient_id.id = sub.sender_id.id)
                            )
                    )
            )
            AND (m.recipient_id.name = :name OR m.sender_id.name = :name OR gm.user_id.name = :name)
            AND (
                (:conversationType = 'all') OR
                (:conversationType = 'peaples' AND m.group_id IS NULL) OR
                (:conversationType = 'groups' AND m.group_id IS NOT NULL)
            )
            GROUP BY m.group_id.id
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
