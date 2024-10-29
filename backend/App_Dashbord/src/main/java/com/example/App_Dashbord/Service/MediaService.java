package com.example.App_Dashbord.Service;

import com.example.App_Dashbord.Repository.MediaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MediaService {
    @Autowired
    private MediaRepository mediaRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(MediaService.class);

}
