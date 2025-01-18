package com.example.App.Dashbord.Service;

import com.example.App.AppDashbordApplication;
import com.example.App.Dashbord.Embedded.FollowerId;
import com.example.App.Dashbord.Enum.FollowerStatusEnum;
import com.example.App.Dashbord.Model.User;
import com.example.App.Dashbord.Repository.FollowerRepository;
import com.example.App.Dashbord.Model.Follower;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ConditionalOnEnabledResourceChain;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class FollowerService {
    @Autowired
    private FollowerRepository followerRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(FollowerService.class);

    @Cacheable(value = "followerCache", key = "'allFollower'")
    public List<Follower> findAllFollowers() {
        return followerRepository.findAll();
    }

    @Cacheable(value = "followerCache", key = "'lastIdByStatus'")
    public Long findLastIdByStatus(final String status) {
        return followerRepository.findLastIdByStatus(status);
    }

    @Cacheable(value = "followerCache", key = "'countFollowersByUser::' + #name")
    public Long countFollowersByUser(final String name){
        return followerRepository.countFollowersByUser(name);
    }

    @Cacheable(value = "followerCache", key = "'countFollowingByUser::' + #name")
    public Long countFollowingByUser(final String name){
        return followerRepository.countFollowingByUser(name);
    }

    @Cacheable(value = "followerCache", key = "'findUsersByStatus::'+#name+'::'+#status")
    public List<User> findUsersByStatus(final String name, final FollowerStatusEnum status){
        return followerRepository.findUsersByStatus(name, status);
    }

    @CacheEvict(value = "followerCache", allEntries = true)
    public void postCreateFollower(Follower follower) {
        if (follower.getId() == null || follower.getId().getId().isEmpty()) {
            follower.setId(new FollowerId());
            follower.getId().setId(new AppDashbordApplication().generateId());
            follower.getId().setStatus(FollowerStatusEnum.PENDING);
        } else {
            follower.getId().setId(new AppDashbordApplication().generateId());
        }
        followerRepository.save(follower);
    }
}
