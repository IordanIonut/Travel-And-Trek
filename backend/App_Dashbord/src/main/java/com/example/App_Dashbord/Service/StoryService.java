package com.example.App_Dashbord.Service;

import com.example.App_Dashbord.Model.Story;
import com.example.App_Dashbord.Model.User;
import com.example.App_Dashbord.Repository.StoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoryService {
    @Autowired
    private StoryRepository storyRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(StoryService.class);

    @Cacheable(value = "storyCache", key = "'allStory'")
    public List<Story> findAllStores() {
        return storyRepository.findAll();
    }

    @Cacheable(value = "storyCache", key = "'findUsersFriends::' + #name + '::' + #view")
    public List<Story> findUsersFriendsStory(String name, String view) {
        return storyRepository.findUsersFriendsStory(name, view);
    }
}
