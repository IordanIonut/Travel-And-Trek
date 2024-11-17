package com.example.App_Dashbord.Repository;

import com.example.App_Dashbord.Enum.PostEnum;
import com.example.App_Dashbord.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.domain.Pageable;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "SELECT MAX(p.id) FROM POSTS p WHERE p.type = :type", nativeQuery = true)
    Long findLastIdByType(@Param("type") String type);

    @Query(value = "SELECT * FROM POSTS p WHERE p.user_id = :id", nativeQuery = true)
    List<Post> findAllPostByUserId(@Param("id") final Long id);

    @Query(value = "SELECT * FROM POSTS p WHERE p.user_id <> 1", nativeQuery = true)
    List<Post> findAllPostWithoutUserId(@Param("id") final Long id);

    @Query(value = "SELECT COUNT(p.id) FROM POSTS p WHERE p.user_id = :user_id AND (p.id IN :media_ids)", nativeQuery = true)
    Long countPostsByUserIdAndMediaIds(@Param("user_id") final Long user_id, @Param("media_ids") final List<Long> media_ids);

    @Query("SELECT COUNT(DISTINCT p.id) FROM Post p JOIN User u ON p.post_user_id.id = u.id WHERE u.name = :name AND p.visible = true")
    Long countPostsByUserName(@Param("name") final String name);

    @Query("SELECT p FROM Post p JOIN User u ON p.post_user_id.id = u.id WHERE u.name = :name AND p.id.type = :type ORDER BY p.update_at DESC, p.create_at DESC")
    List<Post> findAllPostsByUser(@Param("name") final String name, @Param("type") final PostEnum type, Pageable pageable);
}