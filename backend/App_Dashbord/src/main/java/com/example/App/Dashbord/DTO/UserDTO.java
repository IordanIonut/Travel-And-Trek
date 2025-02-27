package com.example.App.Dashbord.DTO;

import com.example.App.Dashbord.Enum.FollowerStatusEnum;
import com.example.App.Dashbord.Model.Follower;
import com.example.App.Dashbord.Model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.SequencedCollection;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    private User user;
    private List<User> friends;
    private FollowerStatusEnum state;

    public List<UserDTO> generateUserDTO(List<User> users, List<Follower> friends, int index, int number) {
        List<UserDTO> userDTOs = new ArrayList<>();

        for (User user : users) {
            List<User> userFriends = new ArrayList<>(7);
            FollowerStatusEnum statusEnum = null;

            for (Follower follower : friends) {
                if (follower.getFollower_user_id().equals(user) || follower.getFollower_user_id_follower().equals(user)) {
                    User mutualFriend = follower.getFollower_user_id().equals(user)
                            ? follower.getFollower_user_id_follower()
                            : follower.getFollower_user_id();

                    if (mutualFriend != null && !userFriends.contains(mutualFriend)) {
                        userFriends.add(mutualFriend);
                        statusEnum = follower.getId().getStatus();

                        if (userFriends.size() == 7) {
                            break;
                        }
                    }
                }
            }
            UserDTO userDTO = new UserDTO(user, userFriends, statusEnum);
            userDTOs.add(userDTO);
        }
        userDTOs.sort(Comparator.comparingInt(dto -> -dto.getFriends().size()));
        int start = index * number;
        int end = Math.min(start + number, userDTOs.size());
        if (start >= userDTOs.size()) {
            return new ArrayList<>();
        }
        return userDTOs.subList(start, end);
    }

}
