package com.example.App.Dashbord.Service;

import com.example.App.Dashbord.Enum.PostEnum;
import com.example.App.Dashbord.Model.Post;
import com.example.App.Dashbord.Repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
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

    @Cacheable(value = "postCache", key = "'getPostByUser::'+#name+'::'+#type+'::'+#hashtags.toString()+'::'+#index+'::'+#number")
    public List<Post> getPostByUser(String name, PostEnum type, List<String> hashtags, int index, int number) {
        Pageable pageable = PageRequest.of(index, number, Sort.by(Sort.Direction.DESC, "update_at"));
        return postRepository.getPostByUser(name, type, hashtags, pageable);
    }

    @Cacheable(value = "postCache", key="'getPostByGroupNameAndType::'+#name+'::'+#type+'::'+#index+'::'+#number")
    public List<Post> getPostByGroupNameAndType(String name, PostEnum type, int index, int number){
        Pageable pageable = PageRequest.of(index, number, Sort.by(Sort.Direction.DESC, "update_at"));
        return postRepository.getPostByGroupNameAndType(name, type, pageable);
    }
}
