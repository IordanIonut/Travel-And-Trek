package com.example.App.Dashbord.Service;

import com.example.App.AppDashbordApplication;
import com.example.App.Dashbord.DTO.UserDTO;
import com.example.App.Dashbord.Embedded.FollowerId;
import com.example.App.Dashbord.Enum.FollowerStatusEnum;
import com.example.App.Dashbord.Model.Follower;
import com.example.App.Dashbord.Model.User;
import com.example.App.Dashbord.Repository.FollowerRepository;
import com.example.App.Dashbord.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FollowerService {
    @Autowired
    private FollowerRepository followerRepository;
    @Autowired
    private UserRepository userRepository;
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
    public Long countFollowersByUser(final String name) {
        return followerRepository.countFollowersByUser(name);
    }

    @Cacheable(value = "followerCache", key = "'countFollowingByUser::' + #name")
    public Long countFollowingByUser(final String name) {
        return followerRepository.countFollowingByUser(name);
    }

    @Cacheable(value = "followerCache", key = "'findUsersFollowerByStatus::'+#name+'::'+#status+'::'+#page+'::'+#size")
    public List<UserDTO> findUsersFollowerByStatus(final String name, final FollowerStatusEnum status, int page, int size) {
        return new UserDTO().generateUserDTO(followerRepository.findUsersFollowerByStatus(name, status), userRepository.findMutualFriends(name), page, size);
    }

    @Cacheable(value = "followerCache", key = "'findUsersByFollowerStatus::'+#name+'::'+#status+'::'+#index+'::'+#number")
    public List<UserDTO> findUsersByFollowerStatus(final String name, final FollowerStatusEnum status, int index, int number) {
        return new UserDTO().generateUserDTO(followerRepository.findUsersByFollowerStatus(name, status), userRepository.findMutualFriends(name), index, number);
    }

    @Transactional
    public void postCreateFollower(Follower follower) {
        if (follower.getFollower_user_id().getId() == null || follower.getFollower_user_id().getId().isEmpty()) {
            Optional<User> followerUserOpt = userRepository.findUserByEmail(follower.getFollower_user_id().getEmail());
            if (followerUserOpt.isEmpty()) {
                throw new IllegalArgumentException("Follower user not found.");
            }
            follower.setFollower_user_id(followerUserOpt.get());
        }

        if (follower.getFollower_user_id_follower().getId() == null || follower.getFollower_user_id_follower().getId().isEmpty()) {
            Optional<User> followerUserOpt = userRepository.findUserByEmail(follower.getFollower_user_id_follower().getEmail()
            );
            if (followerUserOpt.isEmpty()) {
                throw new IllegalArgumentException("Follower user not found.");
            }
            follower.setFollower_user_id_follower(followerUserOpt.get());
        }

        FollowerId id = new FollowerId();
        id.setId(new AppDashbordApplication().generateId());
        id.setStatus(FollowerStatusEnum.PENDING);

        follower.setId(id);
        follower.setCreated_at(LocalDateTime.now());

        followerRepository.save(follower);
    }

    @Transactional
    public void deleteFollower(Follower follower) {
        if (follower.getFollower_user_id().getId() == null || follower.getFollower_user_id().getId().isEmpty()) {
            Optional<User> followerUserOpt = userRepository.findUserByEmail(follower.getFollower_user_id().getEmail());
            if (followerUserOpt.isEmpty()) {
                throw new IllegalArgumentException("Follower user not found.");
            }
            follower.setFollower_user_id(followerUserOpt.get());
        }

        if (follower.getFollower_user_id_follower().getId() == null || follower.getFollower_user_id_follower().getId().isEmpty()) {
            Optional<User> followerUserOpt = userRepository.findUserByEmail(follower.getFollower_user_id_follower().getEmail()
            );
            if (followerUserOpt.isEmpty()) {
                throw new IllegalArgumentException("Follower user not found.");
            }
            follower.setFollower_user_id_follower(followerUserOpt.get());
        }

        this.followerRepository.deleteFollower(follower.getFollower_user_id().getId(), follower.getFollower_user_id_follower().getId());
    }

    //HOME SUGGESTION FRIENDS
    @Cacheable(value = "followerCache", key = "'findUserSuggestions::'+#name+'::'+#hashtags.toString()+'::'+#index+'::'+#number")
    public List<UserDTO> findUserSuggestions(String name, List<String> hashtags, int index, int number) {
        List<User> f = followerRepository.findUserSuggestions(name, hashtags);
        return new UserDTO().generateUserDTO(f, userRepository.findMutualFriends(name), index, number);
    }
}