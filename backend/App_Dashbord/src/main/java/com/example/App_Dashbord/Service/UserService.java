package com.example.App_Dashbord.Service;

import com.example.App_Dashbord.Model.User;
import com.example.App_Dashbord.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private static final Logger LOG =  LoggerFactory.getLogger(UserService.class);

    public Optional<User> getFindById(Long id) {
        return userRepository.findById(id);
    }

    public User postCreateUser(User user) {
        return userRepository.save(user);
    }
}
