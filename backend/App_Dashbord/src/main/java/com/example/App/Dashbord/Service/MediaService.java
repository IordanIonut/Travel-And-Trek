package com.example.App.Dashbord.Service;

import com.example.App.AppDashbordApplication;
import com.example.App.Dashbord.Model.Media;
import com.example.App.Dashbord.Model.User;
import com.example.App.Dashbord.Repository.MediaRepository;
import com.example.App.Dashbord.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MediaService {
    @Autowired
    private MediaRepository mediaRepository;
    @Autowired
    private UserRepository userRepository;
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
    public List<Media> findAllUserIdMedia() {
        return mediaRepository.findAllUserId();
    }

    @Cacheable(value = "mediaCache", key = "'allMediaByUser'")
    public List<Media> findAllMediaByUserId(final String id) {
        return mediaRepository.findAllMediaByUserId(id);
    }

    @Cacheable(value = "hashtagCache", key = "'findOrCreateMedia::'+#media.id")
    public Media findOrCreateMedia(Media media) {
        return mediaRepository.findById(media.getId())
                .orElseGet(() -> {
                    Media newMedia = media;
                    newMedia.getId().setId(AppDashbordApplication.generateId());
                    newMedia.getId().setType(media.getId().getType());
                    if (media.getMedia_user_id() != null) {
                        Optional<User> userOptional = this.userRepository.findByName(media.getMedia_user_id().getName());
                        if (userOptional.isPresent()) {
                            newMedia.setMedia_user_id(userOptional.get());
                        } else {
                            throw new EntityNotFoundException("User not found with name: " + media.getMedia_user_id().getName());
                        }
                    }
                    return mediaRepository.save(newMedia);
                });
    }
}
