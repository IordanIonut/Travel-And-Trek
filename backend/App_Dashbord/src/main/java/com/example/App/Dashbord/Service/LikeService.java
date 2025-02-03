package com.example.App.Dashbord.Service;

import com.example.App.Dashbord.DTO.UserDTO;
import com.example.App.Dashbord.Enum.LikeContentEnum;
import com.example.App.Dashbord.Enum.PostEnum;
import com.example.App.Dashbord.Model.User;
import com.example.App.Dashbord.Repository.LikeRepository;
import com.example.App.Dashbord.Model.Like;
import com.example.App.Dashbord.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(LikeService.class);

    @Cacheable(value = "likeCache", key = "'allLike'")
    public List<Like> findAllLikes() {
        return likeRepository.findAll();
    }

    @Cacheable(value = "likeCache", key ="'findCountLikesByPost::'+#id+'::'+#type")
    public Long findCountLikesByPost(String id, PostEnum type){
        return this.likeRepository.findCountLikesByPost(id, type);
    }

    @Cacheable(value = "likeCache", key = "'findUsersLikesByPost::'+#name+'::'+#id+'::'+#type+'::'+(#content != null ? #content : '')")
    public List<UserDTO> findUsersLikesByPost(String name, String id, PostEnum type, LikeContentEnum content){
        return new UserDTO().generateUserDTO(likeRepository.findUsersLikesByPost(id, type, content), userRepository.findMutualFriends(name), 0, 1000000);
    }
}
