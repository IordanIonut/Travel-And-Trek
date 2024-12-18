package com.example.App.Repository;

import com.example.App.Model.Share;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShareRepository extends JpaRepository<Share, Long> {
    @Query(value = "SELECT MAX(s.id) FROM SHARES s WHERE s.type = :type", nativeQuery = true)
    Long findLastIdByType(@Param("type") String type);

    @Query("SELECT s FROM Share s JOIN User u on s.share_user_id.id = u.id WHERE u.name = :name ORDER BY s.update_at DESC, s.create_at DESC")
    List<Share> findAllSharesByUser(@Param("name") final String name, Pageable pageable);
}