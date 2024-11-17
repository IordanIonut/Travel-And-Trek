package com.example.App_Dashbord.Repository;

import com.example.App_Dashbord.Model.Hastag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HastagRepository extends JpaRepository<Hastag, Long> {
    @Query("SELECT COUNT(DISTINCT t.id) FROM Hastag t")
    Long findTags();

    @Query("SELECT t FROM Hastag t WHERE t.name = :name")
    Optional<Hastag> findByName(@Param("name") String name);

}
