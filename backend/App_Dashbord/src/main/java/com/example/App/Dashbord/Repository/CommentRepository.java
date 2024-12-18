package com.example.App.Repository;

import com.example.App.Model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(value = "SELECT MAX(c.id) FROM COMMENTS c WHERE c.type = :type", nativeQuery = true)
    Long findLastIdByType(@Param("type") String type);
}