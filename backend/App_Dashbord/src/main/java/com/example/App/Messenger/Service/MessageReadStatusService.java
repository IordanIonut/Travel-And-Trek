package com.example.App.Messenger.Service;

import com.example.App.Messenger.Model.MessageReadStatus;
import com.example.App.Messenger.Repository.MessageReadStatusRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageReadStatusService {
    @Autowired
    private MessageReadStatusRepository messageReadStatusRepository;

    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(MessageReadStatusService.class);

    @Cacheable(value = "messageCache", key = "'findAllMessageReadStatus'")
    public List<MessageReadStatus> findAllMessageReadStatus() {
        return messageReadStatusRepository.findAll();

    }
}
