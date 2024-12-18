package com.example.App.Repository;

import com.example.App.Model.Follower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowerRepository extends JpaRepository<Follower, Long> {
    @Query(value = "SELECT MAX(f.id) FROM FOLLOWERS f WHERE f.status = :type", nativeQuery = true)
    Long findLastIdByStatus(@Param("type") String type);

    @Query(value = "SELECT COUNT(f.id) > 0  FROM FOLLOWERS f WHERE f.user_id = :user_id AND f.user_id_follower = :user_id_follower", nativeQuery = true)
    Long findFollowerIfExists(@Param("user_id") final Long user_id, @Param("user_id_follower") final Long user_id_follower);

    @Query("SELECT COUNT(DISTINCT f.id) FROM Follower f JOIN User u on f.follower_user_id.id = u.id WHERE u.name = :name AND f.id.status = 'ACCEPTED' ")
    Long countFollowersByUser(@Param("name") final String name);

    @Query("SELECT COUNT(DISTINCT f.id) FROM Follower f JOIN User u on f.follower_user_id_follower.id = u.id WHERE u.name = :name AND f.id.status = 'ACCEPTED' ")
    Long countFollowingByUser(@Param("name") final String name);
}