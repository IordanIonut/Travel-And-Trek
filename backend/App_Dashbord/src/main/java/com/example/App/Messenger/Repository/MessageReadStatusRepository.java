package com.example.App.Messenger.Repository;

import com.example.App.Messenger.Model.MessageReadStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageReadStatusRepository extends JpaRepository<MessageReadStatus, Long> {
}
