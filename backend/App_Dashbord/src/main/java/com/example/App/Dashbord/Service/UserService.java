package com.example.App.Dashbord.Service;

import com.example.App.Dashbord.DTO.SearchDTO;
import com.example.App.Dashbord.DTO.UserDTO;
import com.example.App.Dashbord.Enum.FollowerStatusEnum;
import com.example.App.Dashbord.Model.Follower;
import com.example.App.Dashbord.Model.User;
import com.example.App.Dashbord.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

    @Cacheable(value = "userCache", key = "#id")
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Cacheable(value = "userCache", key = "'findByName::' + #name")
    public Optional<User> findByName(String name) {
        return userRepository.findByName(name);
    }

    @CacheEvict(value = "userCache", allEntries = true)
    public User postCreateUser(User user) {
        return userRepository.save(user);
    }

    @Cacheable(value = "userCache", key = "'findUserByEmail::' + #email")
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Cacheable(value = "userCache", key = "'findCountUsers'")
    public List<Long> findCountUsers() {
        return userRepository.findCountUsers();
    }

    @Cacheable(value = "userCache", key = "'allUsers'")
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Cacheable(value = "userCache", key = "'allUsersIds'")
    public List<String> allUsers() {
        return userRepository.allUsers();
    }

    @Cacheable(value = "userCache", key = "'findUsersFriends::' + #name")
    public List<User> findUsersFriendsStory(String name) {
        return userRepository.findUsersFriendsStory(name);
    }

    public List<SearchDTO> findSuggestersSearch(String name, String type, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findSuggestersSearch(name, type, pageable);
    }

    @Cacheable(value = "userCache", key = "'findUsersAndMutualFriends::' + #name + '::' + #search + '::' + #page + '::'+#size")
    public List<UserDTO> findUsersAndMutualFriends(String name, String search, int page, int size) {
        List<User> allUsers = userRepository.findUsersBySearch(search);
        List<Follower> mutualFriends = userRepository.findMutualFriends(name);
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
        int start = page * size;
        int end = Math.min(start + size, userDTOs.size());
        if (start >= userDTOs.size()) {
            return new ArrayList<>();
        }
        return userDTOs.subList(start, end);
    }









}
