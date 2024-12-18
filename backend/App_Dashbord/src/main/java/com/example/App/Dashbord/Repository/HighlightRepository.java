package com.example.App.Dashbord.Repository;

import com.example.App.Dashbord.Model.Highlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HighlightRepository extends JpaRepository<Highlight, Long> {
    @Query("SELECT h FROM Highlight h JOIN User u on u.id = h.highlight_user_id.id WHERE u.name = :name ORDER BY h.updated_at DESC ")
    List<Highlight> findAllHighlightsByUser(@Param("name") final String name);
}
