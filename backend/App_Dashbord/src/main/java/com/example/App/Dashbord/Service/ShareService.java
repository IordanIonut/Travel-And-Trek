package com.example.App.Dashbord.Service;

import com.example.App.Dashbord.DTO.UserDTO;
import com.example.App.Dashbord.Enum.PostEnum;
import com.example.App.Dashbord.Repository.ShareRepository;
import com.example.App.Dashbord.Model.Share;
import com.example.App.Dashbord.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShareService {
    @Autowired
    private ShareRepository shareRepository;
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(ShareService.class);

    @Cacheable(value = "shareCache", key = "'allShare'")
    public List<Share> findAllShares(){
        return shareRepository.findAll();
    }

    @Cacheable(value = "shareCache", key = "'findAllSharesByUser::'+#name+'::'+#index+'::'+#number")
    public List<Share> findAllSharesByUser(String name, int index, int number){
        Pageable pageable = PageRequest.of(index, number, Sort.by(Sort.Direction.DESC, "update_at"));
        return shareRepository.findAllSharesByUser(name, pageable);
    }

    @Cacheable(value = "shareCache", key = "'getAllSharesByGroup::'+#name+'::'+#index+'::'+#number")
    public List<Share> getAllSharesByGroup(String name, int index, int number){
        Pageable pageable = PageRequest.of(index, number, Sort.by(Sort.Direction.DESC, "update_at"));
        return shareRepository.getAllSharesByGroup(name, pageable);
    }

    @Cacheable(value = "shareCache", key = "'findCountSharesByPost::'+#id+'::'+#type")
    public Long findCountSharesByPost(String id, PostEnum type){
        return shareRepository.findCountSharesByPost(id, type);
    }

    @Cacheable(value = "shareCache", key = "'findUsersSharesByPost::'+#name+'::'+#id+'::'+#type+'::'")
    public List<UserDTO> findUsersSharesByPost(String name,String id, PostEnum type){
        LOG.info(shareRepository.findUsersSharesByPost(id, type).size()+"");
        return new UserDTO().generateUserDTO(shareRepository.findUsersSharesByPost(id,type), this.userRepository.findMutualFriends(name),0, 1000);
    }
}
