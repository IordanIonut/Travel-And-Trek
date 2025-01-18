package com.example.App.Dashbord.Service;

import com.example.App.Dashbord.DTO.UserDTO;
import com.example.App.Dashbord.Enum.FollowerStatusEnum;
import com.example.App.Dashbord.Model.Follower;
import com.example.App.Dashbord.Model.Post;
import com.example.App.Dashbord.Model.User;
import com.example.App.Dashbord.Repository.HashtagRepository;
import com.example.App.Dashbord.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HashTagService {
    @Autowired
    private HashtagRepository hashtagRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(HashTagService.class);

    @Cacheable(value = "hashtagCache", key = "'getPostByTag::'+#hashtags+'::'+#index+'::'+#number")
    public List<Post> getPostByTag(List<String> hashtags, int index, int number) {
        Pageable pageable = PageRequest.of(index, number);
        return this.hashtagRepository.getPostByTag(hashtags, pageable);
    }

    @Cacheable(value = "hashtagCache", key = "'getUserByTag::'+#name+'::'+#hashtags+'::'+#index+'::'+#number")
    public List<UserDTO> getUserByTag(String name, List<String> hashtags, int index, int number) {
        List<User> allUsers = this.userRepository.findUsersByTags(hashtags);
        List<Follower> mutualFriends = this.userRepository.findMutualFriends(name);
        List<UserDTO> userDTOs = new ArrayList<>();

        for (User user : allUsers) {
            List<User> userFriends = new ArrayList<>();
            FollowerStatusEnum statusEnum = null;

            for (Follower follower : mutualFriends) {
                if (follower.getFollower_user_id().equals(user) || follower.getFollower_user_id_follower().equals(user)) {
                    User mutualFriend = null;

                    if (follower.getFollower_user_id().equals(user)) {
                        mutualFriend = follower.getFollower_user_id_follower();
                    } else {
                        mutualFriend = follower.getFollower_user_id();
                    }
                    if (mutualFriend != null && !userFriends.contains(mutualFriend)) {
                        userFriends.add(mutualFriend);
                        statusEnum = follower.getId().getStatus();
                    }
                }
            }
            UserDTO userDTO = new UserDTO(user, userFriends, statusEnum);
            userDTOs.add(userDTO);
        }
        int start = index * number;
        int end = Math.min(start + number, userDTOs.size());
        if (start >= userDTOs.size()) {
            return new ArrayList<>();
        }
        return userDTOs.subList(start, end);
    }
}
