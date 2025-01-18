package com.example.App.Dashbord.Repository;

import com.example.App.Dashbord.Embedded.FollowerId;
import com.example.App.Dashbord.Enum.FollowerStatusEnum;
import com.example.App.Dashbord.Model.Follower;
import com.example.App.Dashbord.Model.User;
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

    @Query("SELECT COUNT(DISTINCT f.id) FROM Follower f JOIN User u on f.follower_user_id.id = u.id WHERE u.name = :name AND f.id.status = 'ACCEPTED' ")
    Long countFollowersByUser(@Param("name") final String name);

    @Query("SELECT COUNT(DISTINCT f.id) FROM Follower f JOIN User u on f.follower_user_id_follower.id = u.id WHERE u.name = :name AND f.id.status = 'ACCEPTED' ")
    Long countFollowingByUser(@Param("name") final String name);

    @Query("SELECT distinct f.follower_user_id_follower FROM Follower f INNER JOIN User u ON u.id = f.follower_user_id.id " +
            "WHERE u.name = :name AND f.id.status = :status")
    List<User> findUsersByStatus(@Param("name") final String name, @Param("status") final FollowerStatusEnum status);
}