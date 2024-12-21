package com.example.App.Dashbord.Repository;

import com.example.App.Dashbord.Enum.FollowerStatusEnum;
import com.example.App.Dashbord.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT DISTINCT COUNT(u.id) FROM User u")
    Long findUsers();

    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findUserByEmail(@Param("email") final String email);

    @Query("SELECT u.id FROM User u")
    List<Long> findCountUsers();

    @Query("SELECT u.id FROM User u")
    List<String> allUsers();

    @Query("SELECT u FROM User u WHERE UPPER(u.name) = UPPER(:name)")
    Optional<User> findByName(@Param("name") final String name);

    @Query("SELECT DISTINCT u FROM Story s " +
            "JOIN User u on u.id = s.story_user_id.id " +
            "JOIN Follower f ON f.follower_user_id_follower.id = u.id " +
            "JOIN User u2 ON f.follower_user_id.id = u2.id " +
            "WHERE UPPER(u2.name) LIKE  UPPER(:name) " +
            "AND f.id.status = 'ACCEPTED' " +
            "AND s.expiration = false " +
            "AND s.expiration_time > current_time() " +
            "ORDER BY s.create_at DESC")
    List<User> findUsersFriendsStory(@Param("name") String name);
}