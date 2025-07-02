package com.example.App.Dashbord.Service;

import com.example.App.Dashbord.Model.Story;
import com.example.App.Dashbord.Repository.StoryRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoryService {
    @Autowired
    private StoryRepository storyRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(StoryService.class);

    @Cacheable(value = "storyCache", key = "'allStory'")
    @Transactional
    public List<Story> findAllStores() {
        return storyRepository.findAll();
    }

    @Cacheable(value = "storyCache", key = "'findUsersFriends::' + #name + '::' + #view")
    @Transactional
    public List<Story> findUsersFriendsStory(String name, String view) {
        return storyRepository.findUsersFriendsStory(name, view).subList(0, 20);
    }

    @Cacheable(value = "storyCache", key = "'findFriendsStory::'+#name+'::'+#page+'::'+#size")
    @Transactional
    public List<Story> findFriendsStory(String name, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return storyRepository.findFriendsStory(name,pageable);
    }
}
