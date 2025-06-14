package com.example.App.Dashbord.Service;

import com.example.App.AppDashbordApplication;
import com.example.App.Dashbord.DTO.UserDTO;
import com.example.App.Dashbord.Model.Hastag;
import com.example.App.Dashbord.Model.Post;
import com.example.App.Dashbord.Repository.HashtagRepository;
import com.example.App.Dashbord.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HashTagService {
    @Autowired
    private HashtagRepository hashtagRepository;
    @Autowired
    private UserRepository userRepository;
    protected UserDTO userDTO;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(HashTagService.class);

    @Cacheable(value = "hashtagCache", key = "'getPostByTag::'+#hashtags+'::'+#index+'::'+#number")
    public List<Post> getPostByTag(List<String> hashtags, int index, int number) {
        Pageable pageable = PageRequest.of(index, number);
        return this.hashtagRepository.getPostByTag(hashtags, pageable);
    }

    @Cacheable(value = "hashtagCache", key = "'getUserByTag::'+#name+'::'+#hashtags+'::'+#index+'::'+#number")
    public List<UserDTO> getUserByTag(String name, List<String> hashtags, int index, int number) {
        return new UserDTO().generateUserDTO(this.userRepository.findUsersByTags(hashtags),
                this.userRepository.findMutualFriends(name), index, number);

    }
    @Cacheable(value = "hashtagCache", key = "'findOrCreateHashtag::'+#name")
    public Hastag findOrCreateHashtag(String name) {
        return hashtagRepository.findByName(name)
                .orElseGet(() -> {
                    Hastag newHashtag = new Hastag();
                    newHashtag.setId(AppDashbordApplication.generateId());
                    newHashtag.setName(name);
                    return hashtagRepository.save(newHashtag);
                });
    }
}
