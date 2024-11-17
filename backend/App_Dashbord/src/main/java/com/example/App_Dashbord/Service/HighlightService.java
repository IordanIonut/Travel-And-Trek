package com.example.App_Dashbord.Service;

import com.example.App_Dashbord.Model.Highlight;
import com.example.App_Dashbord.Repository.HighlightRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HighlightService {
    @Autowired
    private HighlightRepository highlightRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(HighlightService.class);

    @Cacheable(value = "highlightCache", key = "'findAll'")
    public List<Highlight> findAll(){
        return highlightRepository.findAll();
    }

    @Cacheable(value = "highlightCache", key = "'findAllHighlightsByUser::'+#name")
    public List<Highlight> findAllHighlightsByUser(String name){
        return highlightRepository.findAllHighlightsByUser(name);
    }
}
