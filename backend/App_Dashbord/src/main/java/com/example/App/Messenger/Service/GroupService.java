package com.example.App.Messenger.Service;

import com.example.App.Dashbord.Model.Follower;
import com.example.App.Dashbord.Model.User;
import com.example.App.Messenger.DTO.GroupDTO;
import com.example.App.Messenger.DTO.GroupDetailsDTO;
import com.example.App.Messenger.Enum.GroupMembershipEnum;
import com.example.App.Messenger.Model.Group;
import com.example.App.Messenger.Model.GroupMembership;
import com.example.App.Messenger.Repository.GroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Cacheable(value = "groupCache", key = "'findGroupsByName::'+#name+'::'+#search+'::'+#page+'::'+#size")
    public List<GroupDTO> findGroupsByName(String name, String search, int page, int size) {
       return new GroupDTO().generateGroupDTO(groupRepository.findGroupsByName(name, search), name, page, size);
    }

    @Cacheable(value = "groupCache", key = "'findGroupDetailsDTO::'+#name")
    public GroupDetailsDTO findGroupDetailsDTO(String name) {
        return new GroupDetailsDTO(groupRepository.getGroupDetails(name),
                groupRepository.getNumberOfPostings(name),
                groupRepository.getNumberOfMembersByRole(name, GroupMembershipEnum.MEMBER),
                groupRepository.getNumberOfMembersByRole(name, GroupMembershipEnum.ADMIN));
    }
}
