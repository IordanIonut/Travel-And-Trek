package com.example.App.Service;

import com.example.App.Model.Media;
import com.example.App.Repository.MediaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MediaService {
    @Autowired
    private MediaRepository mediaRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(MediaService.class);

    @Cacheable(value = "mediaCache", key = "'allMedia'")
    public List<Media> findAllMedias() {
        return mediaRepository.findAll();
    }

    @Cacheable(value = "mediaCache", key = "'lastIdByType'")
    public Long findLastIdByType(String type) {
        return mediaRepository.findLastIdByType(type);
    }

    @Cacheable(value = "mediaCache", key = "'allUsers'")
    public List<Long> findAllUserIdMedia() {
        return mediaRepository.findAllUserIdMedia();
    }

    @Cacheable(value = "mediaCache", key = "'allMediaByUser'")
    public List<Media> findAllMediaByUserId(final Long id) {
        return mediaRepository.findAllMediaByUserId(id);
    }
}
