package com.example.App.Journal.Service;

import com.example.App.Journal.Model.Journal;
import com.example.App.Journal.Repository.JournalRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JournalService {
    @Autowired
    private JournalRepository journalRepository;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(JournalService.class);

    @Cacheable(value = "journalCache", key = "'findAllJournal'")
    public List<Journal> findAllJournal() {
        return journalRepository.findAll();
    }
}
