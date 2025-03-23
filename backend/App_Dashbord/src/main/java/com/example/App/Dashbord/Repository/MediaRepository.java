package com.example.App.Dashbord.Repository;

import com.example.App.Dashbord.Embedded.MediaId;
import com.example.App.Dashbord.Enum.LikeEnum;
import com.example.App.Dashbord.Model.Media;
import com.example.App.Dashbord.Model.User;
import com.example.App.Messenger.Model.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaRepository extends JpaRepository<Media, MediaId> {
    @Query(value = "SELECT MAX(m.id) FROM MEDIA m WHERE m.type = :type", nativeQuery = true)
    Long findLastIdByType(@Param("type") String type);

    @Query("SELECT DISTINCT(m) FROM Media m WHERE m.media_user_id IS NOT NULL")
    List<Media> findAllUserId();

    @Query("SELECT DISTINCT(m) FROM Media m WHERE m.media_group_id IS NOT NULL")
    List<Media> findAllGroupId();

    @Query("SELECT m FROM Media m WHERE m.media_user_id.id = :id")
    List<Media> findAllMediaByUserId(@Param("id") final String id);

    @Query("SELECT m FROM Media m WHERE m.media_group_id.id = :id")
    List<Media> findAllMediaByGroupId(@Param("id") final String id);

    @Query("SELECT m FROM Media m WHERE m.media_user_id.id <> :id")
    List<Media> findAllMediaWithoutUserId(@Param("id") final String id);
}