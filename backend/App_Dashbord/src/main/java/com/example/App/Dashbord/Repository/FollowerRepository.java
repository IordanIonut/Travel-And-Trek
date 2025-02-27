package com.example.App.Dashbord.Repository;

import com.example.App.Dashbord.Embedded.FollowerId;
import com.example.App.Dashbord.Enum.FollowerStatusEnum;
import com.example.App.Dashbord.Enum.PostEnum;
import com.example.App.Dashbord.Model.Follower;
import com.example.App.Dashbord.Model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowerRepository extends JpaRepository<Follower, FollowerId> {
    @Query(value = "SELECT MAX(f.id) FROM FOLLOWERS f WHERE f.status = :type", nativeQuery = true)
    Long findLastIdByStatus(@Param("type") String type);

    @Query(value = "SELECT COUNT(f.id) > 0  FROM FOLLOWERS f WHERE f.user_id = :user_id AND f.user_id_follower = :user_id_follower", nativeQuery = true)
    Long findFollowerIfExists(@Param("user_id") final String user_id, @Param("user_id_follower") final String user_id_follower);

    @Query("SELECT DISTINCT COUNT(DISTINCT f.follower_user_id_follower.id) FROM Follower f  WHERE f.follower_user_id.name = :name AND f.id.status = 'ACCEPTED' ")
    Long countFollowersByUser(@Param("name") final String name);

    @Query("SELECT DISTINCT COUNT(DISTINCT f.follower_user_id.id) FROM Follower f  WHERE f.follower_user_id_follower.name = :name AND f.id.status = 'ACCEPTED' ")
    Long countFollowingByUser(@Param("name") final String name);

    @Query("SELECT f.follower_user_id_follower FROM Follower f JOIN User u ON f.follower_user_id.id = u.id WHERE u.name = :name AND f.id.status = :status")
    List<User> findUsers(@Param("name") final String name, @Param("status") final FollowerStatusEnum status);

    @Query("SELECT DISTINCT f.follower_user_id_follower FROM Follower f WHERE f.follower_user_id.name = :name AND f.id.status = :status")
    List<User> findUsersFollowerByStatus(@Param("name") final String name, @Param("status") final FollowerStatusEnum status);

    @Query("SELECT DISTINCT f.follower_user_id FROM Follower f WHERE f.follower_user_id_follower.name = :name AND f.id.status = :status")
    List<User> findUsersByFollowerStatus(@Param("name") final String name, @Param("status") final FollowerStatusEnum status);

    @Query("""
    SELECT DISTINCT u
    FROM User u
     JOIN u.user_hashtag_id uh
     JOIN Follower f1 ON f1.follower_user_id = u AND f1.id.status = 'ACCEPTED'
     JOIN Follower f2 ON f1.follower_user_id_follower = f2.follower_user_id AND f2.id.status = 'ACCEPTED'
     JOIN f1.follower_user_id_follower.user_hashtag_id fuh
    WHERE u.name <> :name
    AND (
        uh.name IN :hashtags 
        OR fuh.name IN :hashtags  
        OR f2.follower_user_id.name IS NOT NULL  
    )
""")
    List<User> findUserSuggestions(@Param("name") String name, @Param("hashtags") List<String> hashtags);

    @Query("""
    SELECT DISTINCT u
    FROM User u
    JOIN Follower f1 ON f1.follower_user_id.name = :name OR f1.follower_user_id_follower.name = :name
    JOIN Follower f2 ON (f1.follower_user_id = f2.follower_user_id_follower OR f1.follower_user_id_follower = f2.follower_user_id)
    WHERE u.name <> :name
    AND (f2.follower_user_id = u OR f2.follower_user_id_follower = u)
""")
    List<User> findCommonFollowers(@Param("name") String name);

}