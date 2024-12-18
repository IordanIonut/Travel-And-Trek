package com.example.App.Service;

import com.example.App.Model.Share;
import com.example.App.Repository.ShareRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShareService {
    @Autowired
    private ShareRepository shareRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(ShareService.class);

    @Cacheable(value = "shareCache", key = "'allShare'")
    public List<Share> findAllShares(){
        return shareRepository.findAll();
    }

    public List<Share> findAllSharesByUser(String name, int index, int number){
        Pageable pageable = PageRequest.of(index, number);
        return shareRepository.findAllSharesByUser(name, pageable);
    }
}
