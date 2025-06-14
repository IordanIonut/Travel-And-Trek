package com.example.App.Dashbord.Service;

import com.example.App.AppDashbordApplication;
import com.example.App.Dashbord.Embedded.PostId;
import com.example.App.Dashbord.Enum.PostEnum;
import com.example.App.Dashbord.Model.Hastag;
import com.example.App.Dashbord.Model.Media;
import com.example.App.Dashbord.Model.Post;
import com.example.App.Dashbord.Model.User;
import com.example.App.Dashbord.Repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private HashTagService hashTagService;
    @Autowired
    private MediaService mediaService;
    @Autowired
    private UserService userService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(PostService.class);

    @Cacheable(value = "postCache", key = "'allPost'")
    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    @CacheEvict(value = "postCache", allEntries = true)
    public List<Post> findAllPostByUserId(final String id) {
        return postRepository.findAllPostByUserId(id);
    }

    @Cacheable(value = "postCache", key = "'countPostsByUserName::'+#name")
    public Long countPostsByUserName(final String name) {
        return postRepository.countPostsByUserName(name);
    }

    @Cacheable(value = "postCache", key = "'findAllPostsByUser::'+#name+'type::'+#type+'index::'+#index+'number::'+#number")
    public List<Post> findAllPostsByUserType(String name, PostEnum type , int index, int number){
        Pageable pageable = PageRequest.of(index, number, Sort.by(Sort.Direction.DESC, "update_at"));
        return postRepository.findAllPostsByUserType(name, type, pageable);
    }

    @Cacheable(value = "postCache", key = "'findAllPostsByUser::'+#name+'index::'+#index+'number::'+#number")
    public List<Post> findAllPostsByUserWithoutType(String name , int index, int number){
        Pageable pageable = PageRequest.of(index, number, Sort.by(Sort.Direction.DESC, "update_at"));
        return postRepository.findAllPostsByUserWithoutType(name, pageable);
    }

    @Cacheable(value = "postCache", key = "'findPostByUserTags::'+#name+'index::'+#index+'number::'+#number")
    public List<Post> findPostByUserTags(String name, int index, int number){
        Pageable pageable = PageRequest.of(index, number, Sort.by(Sort.Direction.DESC, "update_at"));
        return postRepository.findPostByUserTags(name, pageable);
    }

    @Cacheable(value = "postCache", key = "'findPostBySearch::'+#name+'::'+#index+'::'+#number")
    public List<Post> getPostBySearch(String name, int index, int number) {
        Pageable pageable = PageRequest.of(index, number, Sort.by(Sort.Direction.DESC, "update_at"));
        return postRepository.getPostBySearch(name, pageable);
    }

    @Cacheable(value = "postCache", key="'getPostByGroupNameAndType::'+#name+'::'+#type+'::'+#index+'::'+#number")
    public List<Post> getPostByGroupNameAndType(String name, PostEnum type, int index, int number){
        Pageable pageable = PageRequest.of(index, number, Sort.by(Sort.Direction.DESC, "update_at"));
        return postRepository.getPostByGroupNameAndType(name, type, pageable);
    }

    @Cacheable(value = "postCache", key = "'getPostById::'+#id")
    public Optional<Post> getPostById(PostId id) {
        return this.postRepository.findById(id);
    }

    @Cacheable(value = "postCache", key = "'getPostByUserFriends::'+#name+'::'+#type+'::'+#hashtags.toString()+'::'+#index+'::'+#number")
    public List<Post> getPostByUserFriends(String name, PostEnum type, List<String> hashtags, int index, int number) {
        Pageable pageable = PageRequest.of(index, number, Sort.by(Sort.Direction.DESC, "update_at"));
        return this.postRepository.getPostByUserFriends(name, type, hashtags, pageable);
    }

    public Post savePost(Post post) {
        if (post.getPost_hashtag_id() != null) {
            List<Hastag> validatedHashtags = new ArrayList<>();
            for (Hastag hashtag : post.getPost_hashtag_id()) {
                Hastag existingOrNewHashtag = hashTagService.findOrCreateHashtag(hashtag.getName());
                validatedHashtags.add(existingOrNewHashtag);
            }
            post.setPost_hashtag_id(validatedHashtags);
        }
        if (post.getPost_medias_id() != null) {
            List<Media> validatedPost = new ArrayList<>();
            for (Media media : post.getPost_medias_id()) {
                Media existingOrNewMedia = mediaService.findOrCreateMedia(media);
                validatedPost.add(existingOrNewMedia);
            }
            post.setPost_medias_id(validatedPost);
        }
        if (post.getPost_user_id() != null) {
            Optional<User> userOptional = this.userService.findByName(post.getPost_user_id().getName());

            if (userOptional.isPresent()) {
                post.setPost_user_id(userOptional.get());
            } else {
                throw new EntityNotFoundException("User not found with name: " + post.getPost_user_id().getName());
            }
        }
        if (post.getTagged_users() != null) {
            List<User> validatedUser = new ArrayList<>();
            for (User user : post.getTagged_users()) {
                Optional<User> userOptional = this.userService.findByName(user.getName());

                if (userOptional.isPresent()) {
                    validatedUser.add(userOptional.get());
                } else {
                    throw new EntityNotFoundException("User not found with name: " + user.getName());
                }
            }
            post.setTagged_users(validatedUser);
        }

        post.getId().setId(AppDashbordApplication.generateId());
        return postRepository.save(post);
    }
}
