package com.example.App.Messenger.Service;

import com.example.App.Messenger.Model.Message;
import com.example.App.Messenger.Repository.MessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(MessageService.class);

    @Cacheable(value = "messageCache", key = "'findAllMessage'")
    public List<Message> findAllMessage() {
        return messageRepository.findAll();
    }


}
