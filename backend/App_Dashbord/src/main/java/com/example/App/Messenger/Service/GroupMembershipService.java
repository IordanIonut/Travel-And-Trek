package com.example.App.Messenger.Service;

import com.example.App.AppDashbordApplication;
import com.example.App.Dashbord.Repository.UserRepository;
import com.example.App.Dashbord.Service.UserService;
import com.example.App.Messenger.Model.GroupMembership;
import com.example.App.Messenger.Repository.GroupMembershipRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupMembershipService {
    @Autowired
    private GroupMembershipRepository groupMembershipRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(GroupMembershipService.class);

    @Cacheable(value = "groupMembershipCache", key = "'findAllGroupMemberships'")
    public List<GroupMembership> findAllGroupMemberships() {
        return groupMembershipRepository.findAll();
    }

    @CacheEvict(value = "groupMembershipCache", allEntries = true)
    public void postCreateGroupMembership(GroupMembership groupMembership) {
        groupMembership.getUser_id().setId(userRepository.findByName(groupMembership.getUser_id().getName()).get().getId());
        groupMembership.getId().setId(new AppDashbordApplication().generateId());
        groupMembershipRepository.save(groupMembership);
    }
}
