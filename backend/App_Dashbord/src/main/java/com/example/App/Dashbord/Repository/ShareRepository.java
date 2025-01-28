package com.example.App.Dashbord.Repository;

import com.example.App.Dashbord.Embedded.ShareId;
import com.example.App.Dashbord.Model.Share;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShareRepository extends JpaRepository<Share, ShareId> {
    @Query(value = "SELECT MAX(s.id) FROM SHARES s WHERE s.type = :type", nativeQuery = true)
    Long findLastIdByType(@Param("type") String type);

    @Query("SELECT s FROM Share s JOIN User u on s.share_user_id.id = u.id WHERE u.name = :name ORDER BY s.update_at DESC, s.create_at DESC")
    List<Share> findAllSharesByUser(@Param("name") final String name, Pageable pageable);

    @Query("SELECT DISTINCT s FROM Share s INNER JOIN Group g ON s.share_post_id.post_group_id.id = g.id   WHERE g.name = :name ORDER BY s.update_at DESC, s.create_at DESC ")
    List<Share> getAllSharesByGroup(@Param("name") final String name, final Pageable pageable);

}