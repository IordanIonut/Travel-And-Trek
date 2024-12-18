package com.example.App.Dashbord.Repository;

import com.example.App.Dashbord.Model.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
    @Query("SELECT COUNT(DISTINCT t.id) FROM Hashtag t")
    Long findTags();

    @Query("SELECT t FROM Hashtag t WHERE t.name = :name")
    Optional<Hashtag> findByName(@Param("name") String name);

}
