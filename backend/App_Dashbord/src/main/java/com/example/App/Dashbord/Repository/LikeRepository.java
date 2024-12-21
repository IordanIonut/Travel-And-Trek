package com.example.App.Dashbord.Repository;

import com.example.App.Dashbord.Embedded.LikeId;
import com.example.App.Dashbord.Embedded.PostId;
import com.example.App.Dashbord.Embedded.CommentId;
import com.example.App.Dashbord.Embedded.MediaId;
import com.example.App.Dashbord.Model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, LikeId> {
    @Query("SELECT MAX(l) FROM Like l WHERE l.id.type = :type AND l.id.content = :content ")
    Long findLastIdByStatus(@Param("type") String type, @Param("content") String content);

    @Query("SELECT COUNT(l) FROM Like l WHERE l.like_user_id.id = :user_id AND (:media_id IS NULL OR l.like_media_id.id = :media_id) " +
            "AND (:post_id IS NULL OR l.like_post_id.id = :post_id) " +
            "AND (:comment_id IS NULL OR l.like_comment_id.id = :comment_id)")
    Long findLikeIfExists(@Param("user_id") String user_id, @Param("media_id") MediaId media_id, @Param("post_id") PostId post_id, @Param("comment_id") CommentId comment_id);
}
