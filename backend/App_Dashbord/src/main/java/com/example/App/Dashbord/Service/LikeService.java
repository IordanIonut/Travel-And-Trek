package com.example.App.Dashbord.Service;

import com.example.App.AppDashbordApplication;
import com.example.App.Dashbord.DTO.LikeDTO;
import com.example.App.Dashbord.DTO.UserDTO;
import com.example.App.Dashbord.Enum.CommentEnum;
import com.example.App.Dashbord.Enum.LikeContentEnum;
import com.example.App.Dashbord.Enum.PostEnum;
import com.example.App.Dashbord.Model.Like;
import com.example.App.Dashbord.Repository.LikeRepository;
import com.example.App.Dashbord.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @CacheEvict(value = "likeCache", allEntries = true)
    @Transactional
    public void postLike(Like like) {
        like.getLike_user_id().setId(userRepository.findByName(like.getLike_user_id().getName()).get().getId());
        Optional<Like> existingLike = this.likeRepository.findLIfExists(like.getLike_user_id().getId(), like.getLike_media_id() != null ? like.getLike_media_id().getId() : null, like.getLike_post_id() != null ? like.getLike_post_id().getId() : null, like.getLike_comment_id() != null ? like.getLike_comment_id().getId() : null);
        if (existingLike.isPresent()) {
            Like existing = existingLike.get();
            if (existing.getId().getContent() == like.getId().getContent()) {
                likeRepository.deleteById(existing.getId());
            } else {
                existing.getId().setContent(like.getId().getContent());
                likeRepository.updateContent(existing.getId().getId(), existing.getId().getType(), like.getId().getContent());
            }
        } else {
            like.getId().setId(new AppDashbordApplication().generateId());
            likeRepository.save(like);
        }
    }

    @Cacheable(value = "likeCache", key = "'findCountLikesByPost::'+#id+'::'+#value+'::'+'::'+#type")
    public LikeDTO findCountLikesByPost(String id, String value, String type) {
        if (type.equals("POST"))
            return new LikeDTO(this.likeRepository.findCountLikesByPost(id, PostEnum.valueOf(value)), this.likeRepository.findContentLikesByPost(id, PostEnum.valueOf(value)).get(0));
        else if (type.equals("COMMENT"))
            return new LikeDTO(this.likeRepository.findCountLikesByComment(id, CommentEnum.valueOf(value)), this.likeRepository.findContentLikesByComment(id, CommentEnum.valueOf(value)).get(0));
        return null;
    }

    @Cacheable(value = "likeCache", key = "'findUsersLikesByPost::'+#name+'::'+#id+'::'+#type+'::'+(#content != null ? #content : '')")
    public List<UserDTO> findUsersLikesByPost(String name, String id, PostEnum type, LikeContentEnum content){
        return new UserDTO().generateUserDTO(likeRepository.findUsersLikesByPost(id, type, content), userRepository.findMutualFriends(name), 0, 1000000);
    }
}
