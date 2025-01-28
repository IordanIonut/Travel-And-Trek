package com.example.App.Messenger.DTO;

import com.example.App.Dashbord.Model.Follower;
import com.example.App.Dashbord.Model.User;
import com.example.App.Messenger.Model.Group;
import com.example.App.Messenger.Model.GroupMembership;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GroupDTO {
    private Group group;
    private List<GroupMembership> groupMembership;
    private List<User> friends;
    private List<User> followers;
    private Long users;

    public List<GroupDTO> generateGroupDTO(List<Object[]> results, String name, int page, int size) {
        List<GroupDTO> groupDTOs = new ArrayList<>();

        for (Object[] result : results) {
            Group group = (Group) result[0];
            GroupMembership groupMembership = (GroupMembership) result[1];
            User user = (User) result[2];
            Follower follower = (Follower) result[3];

            boolean isFriend = false;
            boolean isFollower = false;

            if (follower != null) {
                isFollower = follower.getFollower_user_id_follower() != null
                        && follower.getFollower_user_id_follower().getName().equals(name);
                isFriend = follower.getFollower_user_id() != null
                        && follower.getFollower_user_id().getName().equals(name);
            }

            Optional<GroupDTO> groupDTOOptional = groupDTOs.stream()
                    .filter(dto -> dto.getGroup().getId().equals(group.getId()))
                    .findFirst();

            if (groupDTOOptional.isPresent()) {
                GroupDTO existingGroupDTO = groupDTOOptional.get();

                if (groupMembership != null && groupMembership.getUser_id().getName().equals(name)) {
                    if (!existingGroupDTO.getGroupMembership().contains(groupMembership)) {
                        existingGroupDTO.getGroupMembership().add(groupMembership);
                    }
                }

                if (user != null) {
                    if (isFriend && !existingGroupDTO.getFriends().contains(user) && !user.getName().equals(name)) {
                        existingGroupDTO.getFriends().add(user);
                    }
                    if (isFollower && !existingGroupDTO.getFollowers().contains(follower.getFollower_user_id())) {
                        existingGroupDTO.getFollowers().add(follower.getFollower_user_id());
                    }
                }

                existingGroupDTO.setUsers(existingGroupDTO.getUsers() + 1);
            } else {
                List<GroupMembership> memberships = new ArrayList<>();
                if (groupMembership != null && groupMembership.getUser_id().getName().equals(name)) {
                    memberships.add(groupMembership);
                }

                List<User> friends = new ArrayList<>();
                List<User> followers = new ArrayList<>();

                if (isFriend && user != null && !user.getName().equals(name)) {
                    friends.add(user);
                }
                if (isFollower && follower != null) {
                    followers.add(follower.getFollower_user_id());
                }

                GroupDTO groupDTO = new GroupDTO(group, memberships, friends, followers, 1L);
                groupDTOs.add(groupDTO);
            }
        }
        groupDTOs.sort(Comparator.comparingInt(dto -> -dto.getGroupMembership().size()));
        int start = page * size;
        int end = Math.min(start + size, groupDTOs.size());
        if (start >= groupDTOs.size()) {
            return new ArrayList<>();
        }
        return groupDTOs.subList(start, end);

}
}
