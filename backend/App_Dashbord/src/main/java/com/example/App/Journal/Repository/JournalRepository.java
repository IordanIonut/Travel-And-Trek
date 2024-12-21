package com.example.App.Journal.Repository;

import com.example.App.Journal.Model.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {
    @Query("SELECT j FROM Journal j WHERE j.user_id.id = :user")
    List<Journal> findAllJournalByUser(@Param("user") final String user);
}
