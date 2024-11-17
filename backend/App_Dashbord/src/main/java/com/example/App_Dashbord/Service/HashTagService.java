package com.example.App_Dashbord.Service;

import com.example.App_Dashbord.Repository.HashtagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HashTagService {
    @Autowired
    private HashtagRepository hashtagRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(HashTagService.class);
}
