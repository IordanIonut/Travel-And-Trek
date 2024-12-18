package com.example.App.Journal.Service;

import com.example.App.Dashbord.Service.FollowerService;
import com.example.App.Journal.Model.Hobby;
import com.example.App.Journal.Repository.HobbyRepository;
import org.checkerframework.checker.units.qual.A;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HobbyService {
    @Autowired
    private HobbyRepository hobbyRepository;

    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(HobbyRepository.class);

    @Cacheable(value = "hobbyCache", key = "'findAllHobby'")
    public List<Hobby> findAllHobby(){
        return hobbyRepository.findAll();
    }
}
