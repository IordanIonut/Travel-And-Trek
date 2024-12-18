package com.example.App.Service;

import com.example.App.Model.Like;
import com.example.App.Repository.LikeRepository;
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
    private static final Logger LOG = LoggerFactory.getLogger(LikeService.class);

    @Cacheable(value = "likeCache", key = "'allLike'")
    public List<Like> findAllLikes() {
        return likeRepository.findAll();
    }
}