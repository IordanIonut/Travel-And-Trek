package com.example.App.Messenger.Service;

import com.example.App.Messenger.Model.Group;
import com.example.App.Messenger.Repository.GroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(GroupService.class);

    @Cacheable(value = "groupCache", key = "'findAllGroups'")
    public List<Group> findAllGroups() {
        return groupRepository.findAll();
    }

}
