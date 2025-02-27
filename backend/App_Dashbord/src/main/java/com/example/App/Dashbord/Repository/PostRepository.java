package com.example.App.Dashbord.Repository;

import com.example.App.Dashbord.Embedded.PostId;
import com.example.App.Dashbord.Enum.PostEnum;
import com.example.App.Dashbord.Model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;

@Repository
public interface PostRepository extends JpaRepository<Post, PostId> {
    @Query(value = "SELECT * FROM POSTS p WHERE p.user_id = :id", nativeQuery = true)
    List<Post> findAllPostByUserId(@Param("id") final String id);

    @Query(value = "SELECT * FROM POSTS p WHERE p.user_id <> 1", nativeQuery = true)
    List<Post> findAllPostWithoutUserId(@Param("id") final String id);

    @Query(value = "SELECT COUNT(p.id) FROM POSTS p WHERE p.user_id = :user_id AND (p.id IN :media_ids)", nativeQuery = true)
    Long countPostsByUserIdAndMediaIds(@Param("user_id") final String user_id, @Param("media_ids") final List<String> media_ids);

    @Query("SELECT COUNT(DISTINCT p.id) FROM Post p JOIN User u ON p.post_user_id.id = u.id WHERE u.name = :name AND p.visible = true")
    Long countPostsByUserName(@Param("name") final String name);
    //add visibility condition
    @Query("SELECT p FROM Post p JOIN User u ON p.post_user_id.id = u.id WHERE u.name = :name AND p.id.type = :type ORDER BY p.update_at DESC")
    List<Post> findAllPostsByUserType(@Param("name") final String name, @Param("type") final PostEnum type, Pageable pageable);
    //add visibility condition
    @Query("SELECT p FROM Post p JOIN User u ON p.post_user_id.id = u.id WHERE u.name = :name  ORDER BY p.update_at DESC")
    List<Post> findAllPostsByUserWithoutType(@Param("name") final String name, Pageable pageable);
    //add visibility condition
    @Query("SELECT p FROM Post p JOIN p.tagged_users u  WHERE u.name = :name ORDER BY p.update_at DESC")
    List<Post> findPostByUserTags(@Param("name") final String name, Pageable pageable);
    //add visibility condition
    @Query("SELECT DISTINCT p FROM Post p " +
            "LEFT JOIN p.post_user_id u " +
            "WHERE u.name LIKE CONCAT(:search, '%') " +
            "OR EXISTS (SELECT 1 FROM p.tagged_users t WHERE t.name LIKE CONCAT(:search, '%')) " +
            "ORDER BY p.update_at DESC")
    List<Post> getPostBySearch(@Param("search") String search, Pageable pageable);
    @Query("SELECT DISTINCT p FROM Post p " +
            "WHERE p.post_group_id.name = :name " +
            "AND (:type IS NULL OR p.id.type = :type) ORDER BY p.update_at DESC")
    List<Post> getPostByGroupNameAndType(@Param("name") String name, @Param("type") PostEnum type, Pageable pageable);

    @Query("""
    SELECT DISTINCT p
        FROM Post p
        LEFT JOIN p.post_user_id u
        LEFT JOIN p.tagged_users pt 
        LEFT JOIN p.post_hashtag_id hs
        LEFT JOIN Follower f ON f.follower_user_id.id = p.post_user_id.id
        LEFT JOIN u.user_hashtag_id uh
        WHERE p.id.type = :type AND ( u.name = :name 
        OR(f.follower_user_id.name = :name AND f.id.status = 'ACCEPTED')
        OR (f.follower_user_id_follower.name = :name AND f.id.status = 'ACCEPTED')
        OR pt.id = u.id
        OR hs.name IN :hashtags
        OR uh.name IN :hashtags )
        AND p.visible = true ORDER BY p.update_at DESC
            """)
    List<Post> getPostByUserFriends(@Param("name") String name, @Param("type") PostEnum type, @Param("hashtags") List<String> hashtags, Pageable pageable);

}