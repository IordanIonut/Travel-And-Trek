package com.example.App.Dashbord.Repository;

import com.example.App.Dashbord.Embedded.CommentId;
import com.example.App.Dashbord.Enum.PostEnum;
import com.example.App.Dashbord.Model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, CommentId> {
    @Query(value = "SELECT MAX(c.id) FROM COMMENTS c WHERE c.type = :type", nativeQuery = true)
    Long findLastIdByType(@Param("type") String type);

    @Query("SELECT DISTINCT COUNT(c.id.id) FROM Comment c WHERE c.comment_post_id.id.id = :id AND c.comment_post_id.id.type = :type")
    Long findCountCommentsByPost(@Param("id") final String id, @Param("type") final PostEnum type);
}