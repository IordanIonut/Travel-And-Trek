package com.example.App.Messenger.Service;

import com.example.App.Messenger.Model.Message;
import com.example.App.Messenger.Model.MessageReadStatus;
import com.example.App.Messenger.Repository.MessageReadStatusRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageReadStatusService {
    @Autowired
    private MessageReadStatusRepository messageReadStatusRepository;

    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(MessageReadStatusService.class);

    @Cacheable(value = "messageReadStatusCache", key = "'findAllMessageReadStatus'")
    public List<MessageReadStatus> findAllMessageReadStatus() {
        return messageReadStatusRepository.findAll();
    }

    @Cacheable(value = "messageReadStatusCache", key = "'findConversationsByUser::'+#user+'::'+#conversationType")
    public List<MessageReadStatus> findConversationsByUser(final String user, final String conversationType){
        return messageReadStatusRepository.findConversationsByUser(user, conversationType);
    }

    @Cacheable(value = "messageReadStatusCache", key = "'findMessageByUser::'+#recipient+'::'+#sender")
    public List<MessageReadStatus> findMessageByUser(String recipient, String sender){
        return messageReadStatusRepository.findMessageByUser(recipient, sender);
    }

    @Cacheable(value = "messageReadStatusCache", key = "'findMessageReadStatusByGroup::'+#groupId")
    public List<MessageReadStatus> findMessageReadStatusByGroup(final String groupId){
        return messageReadStatusRepository.findMessageReadStatusByGroup(groupId);
    }
}
