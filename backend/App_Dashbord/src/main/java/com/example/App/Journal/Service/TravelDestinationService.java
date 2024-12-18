package com.example.App.Journal.Service;

import com.example.App.Dashbord.Service.FollowerService;
import com.example.App.Journal.Model.TravelDestination;
import com.example.App.Journal.Repository.TravelDestionationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TravelDestinationService {
    @Autowired
    private TravelDestionationRepository travelDestionationRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(TravelDestinationService.class);

    @Cacheable(value = "travelDestinationCache", key = "'findAllTravelDestinations'")
    public List<TravelDestination> findAllTravelDestinations(){
        return travelDestionationRepository.findAll();
    }
}

