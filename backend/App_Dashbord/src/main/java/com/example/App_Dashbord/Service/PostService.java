package com.example.App_Dashbord.Service;

import com.example.App_Dashbord.Enum.PostEnum;
import com.example.App_Dashbord.Model.Post;
import com.example.App_Dashbord.Repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.data.domain.Pageable;

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
    public List<Post> findAllPostByUserId(final Long id) {
        return postRepository.findAllPostByUserId(id);
    }

    @Cacheable(value = "postCache", key = "'countPostsByUserName::'+#name")
    public Long countPostsByUserName(final String name) {
        return postRepository.countPostsByUserName(name);
    }

    @Cacheable(value = "postCache", key = "'findAllPostsByUser::'+#name+'type::'+#type+'index::'+#index+'number::'+#number")
    public List<Post> findAllPostsByUser(String name, PostEnum type , int index, int number){
        Pageable pageable = PageRequest.of(index, number);
        return postRepository.findAllPostsByUser(name, type, pageable);
    }
}
