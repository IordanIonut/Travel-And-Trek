package com.example.App.Messenger.Service;

import com.example.App.Messenger.DTO.GroupDTO;
import com.example.App.Dashbord.Model.Follower;
import com.example.App.Dashbord.Model.User;
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
        List<GroupDTO> groupDTOs = new ArrayList<>();
        List<Object[]> results = groupRepository.findGroupsByName(name, search);
//        LOG.info("Size: " + results.size());
        for (Object[] result : results) {
            Group group = (Group) result[0];
            GroupMembership groupMembership = (GroupMembership) result[1];
            User user = (User) result[2];
            Follower follower = (Follower) result[3];

            if (user != null) {
                boolean isFriend = false;
                boolean isFollower = false;
                if (follower != null) {
                    isFollower = follower.getFollower_user_id_follower().getName().equals(name);
                    isFriend = follower.getFollower_user_id().getName().equals(name);
                }

                Optional<GroupDTO> groupDTOOptional = groupDTOs.stream().filter(dto -> dto.getGroup().getId().equals(group.getId())).findFirst();

                if (groupDTOOptional.isPresent()) {
                    GroupDTO existingGroupDTO = groupDTOOptional.get();
                    if (isFriend && !existingGroupDTO.getFriends().contains(user)) {
                        existingGroupDTO.getFriends().add(user);
                        existingGroupDTO.setUsers(existingGroupDTO.getUsers() + 1);
                    }
                    if (isFollower && !existingGroupDTO.getFollowers().contains(follower.getFollower_user_id())) {
                        existingGroupDTO.getFollowers().add(follower.getFollower_user_id());
                        existingGroupDTO.setUsers(existingGroupDTO.getUsers() + 1);
                    }
                } else {
                    List<User> friends = isFriend ? new ArrayList<>(List.of(user)) : new ArrayList<>();
                    List<User> followers = isFollower ? new ArrayList<>(List.of(follower.getFollower_user_id())) : new ArrayList<>();
                    groupMembership = groupMembership.getUser_id().getName().equals(name) ? groupMembership : null;
                    GroupDTO groupDTO = new GroupDTO(group, groupMembership, friends, followers, 1L);
                    groupDTOs.add(groupDTO);
                }
            }
        }
        int start = page * size;
        int end = Math.min(start + size, groupDTOs.size());
        if (start >= groupDTOs.size()) {
            return new ArrayList<>();
        }
        return groupDTOs.subList(start, end);
    }
}
