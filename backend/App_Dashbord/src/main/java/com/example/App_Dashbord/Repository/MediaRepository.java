package com.example.App_Dashbord.Repository;

import com.example.App_Dashbord.Model.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {
    @Query(value = "SELECT MAX(m.id) FROM MEDIA m WHERE m.type = :type", nativeQuery = true)
    Long findLastIdByType(@Param("type") String type);

    @Query(value = "SELECT DISTINCT(m.user_id) FROM MEDIA m", nativeQuery = true)
    List<Long> findAllUserIdMedia();

    @Query(value = "SELECT * FROM MEDIA m WHERE m.user_id = :id", nativeQuery = true)
    List<Media> findAllMediaByUserId(@Param("id") final Long id);

    @Query(value = "SELECT * FROM MEDIA m WHERE m.user_id <> :id AND m.type = :type ", nativeQuery = true)
    List<Media> findAllMediaWithoutUserId(@Param("id") final Long id, @Param("type") final String type);
}