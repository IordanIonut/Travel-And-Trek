package com.example.App.Messenger.Repository;

import com.example.App.Messenger.Embedded.MessagesId;
import com.example.App.Messenger.Model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, MessagesId> {


}