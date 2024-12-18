package com.example.App.Dashbord.Repository;

import com.example.App.Dashbord.Model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
    @Query("SELECT DISTINCT s FROM Story s " +
            "JOIN User u on u.name = :view  and u.name = s.story_user_id.name " +
            "JOIN Follower f ON f.follower_user_id_follower.id = u.id " +
            "JOIN User u2 ON f.follower_user_id.id = u2.id " +
            "WHERE UPPER(u2.name) LIKE  UPPER(:name) " +
            "AND f.id.status = 'ACCEPTED' " +
            "AND s.expiration = false " +
            "AND s.expiration_time > current_time() " +
            "ORDER BY s.expiration_time DESC")
    List<Story> findUsersFriendsStory(@Param("name") String name, @Param("view") String view);
}