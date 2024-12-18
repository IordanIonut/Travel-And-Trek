package com.example.App.Service;

import com.example.App.Model.User;
import com.example.App.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

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
    public List<Long> allUsers() {
        return userRepository.allUsers();
    }

    @Cacheable(value = "userCache", key = "'findUsersFriends::' + #name")
    public List<User> findUsersFriendsStory(String name) {
        return userRepository.findUsersFriendsStory(name);
    }
}
