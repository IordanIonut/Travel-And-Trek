package com.example.App.Dashbord.Repository;

import com.example.App.Dashbord.Model.Hashtag;
import com.example.App.Dashbord.Model.Post;
import com.example.App.Dashbord.Model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
    @Query("SELECT COUNT(DISTINCT t.id) FROM Hashtag t")
    Long findTags();

    @Query("SELECT t FROM Hashtag t WHERE t.name = :name")
    Optional<Hashtag> findByName(@Param("name") String name);

    @Query("""
                SELECT DISTINCT p
                FROM Post p
                LEFT JOIN p.post_user_id u
                LEFT JOIN p.tagged_users pt
                LEFT JOIN p.post_hashtag_id hs
                LEFT JOIN Follower f on f.follower_user_id.id = p.post_user_id.id
                LEFT JOIN u.user_hashtag_id uh
                WHERE (f.follower_user_id.id = u.id AND f.id.status = 'ACCEPTED')
                      OR pt.id = u.id
                      OR hs.name IN :hashtags
                      OR uh.name IN :hashtags
                ORDER BY p.create_at DESC, p.update_at DESC
            """)
    List<Post> getPostByTag(@Param("hashtags") List<String> hashtags, Pageable pageable);

    @Query("SELECT distinct h.name FROM Hashtag h")
    List<String> findAllTagsByName();
}
