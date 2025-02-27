package com.example.App.Dashbord.Service;

import com.example.App.AppDashbordApplication;
import com.example.App.Dashbord.DTO.UserDTO;
import com.example.App.Dashbord.Embedded.FollowerId;
import com.example.App.Dashbord.Enum.FollowerStatusEnum;
import com.example.App.Dashbord.Model.Follower;
import com.example.App.Dashbord.Model.User;
import com.example.App.Dashbord.Repository.FollowerRepository;
import com.example.App.Dashbord.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

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
    public Long countFollowersByUser(final String name){
        return followerRepository.countFollowersByUser(name);
    }

    @Cacheable(value = "followerCache", key = "'countFollowingByUser::' + #name")
    public Long countFollowingByUser(final String name){
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


    //HOME SUGGESTION FRIENDS
//    @Cacheable(value ="followerCache", key = "'findUserSuggestions::'+#name+'::'+#hashtags.toString()+'::'+#index+'::'+#number")
//    public List<UserDTO> findUserSuggestions(String name,  List<String> hashtags,  int index, int number){
//        List<User> f = followerRepository.findUserSuggestions(name, hashtags);
//        LOG.info(f.size()+"");
//        return new UserDTO().generateUserDTO(f, userRepository.findMutualFriends(name), index, number);
//    }

    @Cacheable(value = "followerCache", key = "'findUserSuggestions::'+#name+'::'+#hashtags.toString()+'::'+#index+'::'+#number")
    public List<UserDTO> findUserSuggestions(String name, List<String> hashtags, int index, int number) {
        List<User> suggestedUsers = this.followerRepository.findCommonFollowers(name);
        List<Follower> mutualFollowers = userRepository.findMutualFriends(name);

        List<UserDTO> userDTOs = new ArrayList<>();

        for (User user : suggestedUsers) {
            List<User> mutualFriends = new ArrayList<>();
            FollowerStatusEnum statusEnum = null;

            for (Follower follower : mutualFollowers) {
                if (follower.getFollower_user_id().equals(user) || follower.getFollower_user_id_follower().equals(user)) {
                    User mutualFriend = follower.getFollower_user_id().equals(user)
                            ? follower.getFollower_user_id_follower()
                            : follower.getFollower_user_id();

                    if (!mutualFriends.contains(mutualFriend)) {
                        mutualFriends.add(mutualFriend);
                        statusEnum = follower.getId().getStatus();

                        if (mutualFriends.size() == 7) {
                            break;
                        }
                    }
                }
            }
            userDTOs.add(new UserDTO(user, mutualFriends, statusEnum));
        }
        userDTOs.sort(Comparator.comparingInt(dto -> -dto.getFriends().size()));

        return userDTOs;
    }
}
