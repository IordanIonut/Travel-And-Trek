package com.example.App.Dashbord.Repository;

import com.example.App.Dashbord.Embedded.PostId;
import com.example.App.Dashbord.Enum.PostEnum;
import com.example.App.Dashbord.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;

@Repository
public interface PostRepository extends JpaRepository<Post, PostId> {
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
    //add visibility condition
    @Query("SELECT p FROM Post p JOIN User u ON p.post_user_id.id = u.id WHERE u.name = :name AND p.id.type = :type ORDER BY p.update_at DESC, p.create_at DESC")
    List<Post> findAllPostsByUserType(@Param("name") final String name, @Param("type") final PostEnum type, Pageable pageable);
    //add visibility condition
    @Query("SELECT p FROM Post p JOIN User u ON p.post_user_id.id = u.id WHERE u.name = :name  ORDER BY p.update_at DESC, p.create_at DESC")
    List<Post> findAllPostsByUserWithoutType(@Param("name") final String name, Pageable pageable);
    //add visibility condition
    @Query("SELECT p FROM Post p JOIN p.tagged_users u  WHERE u.name = :name ORDER BY p.update_at DESC, p.create_at DESC")
    List<Post> findPostByUserTags(@Param("name") final String name, Pageable pageable);

//    SELECT p.* FROM post_tags pt JOIN users u ON pt.user_id = u.id JOIN posts p ON p.id = pt.post_id_post WHERE u.name = 'leoma.streich' ORDER BY  p.update_at DESC, p.create_at desc

}