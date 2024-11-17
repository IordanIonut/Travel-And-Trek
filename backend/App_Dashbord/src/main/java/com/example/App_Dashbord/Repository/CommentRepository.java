package com.example.App_Dashbord.Repository;

import com.example.App_Dashbord.Model.Comment;
import com.example.App_Dashbord.Model.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(value = "SELECT MAX(c.id) FROM COMMENTS c WHERE c.type = :type", nativeQuery = true)
    Long findLastIdByType(@Param("type") String type);
}