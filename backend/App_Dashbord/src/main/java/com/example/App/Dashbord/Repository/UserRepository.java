package com.example.App.Dashbord.Repository;

import com.example.App.Dashbord.DTO.SearchDTO;
import com.example.App.Dashbord.Model.Follower;
import com.example.App.Dashbord.Model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT DISTINCT COUNT(u.id) FROM User u")
    Long findUsers();

    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findUserByEmail(@Param("email") final String email);

    @Query("SELECT u.id FROM User u")
    List<Long> findCountUsers();

    @Query("SELECT u.id FROM User u")
    List<String> allUsers();

    @Query("SELECT u FROM User u WHERE UPPER(u.name) = UPPER(:name)")
    Optional<User> findByName(@Param("name") final String name);

    @Query("SELECT DISTINCT u FROM Story s " + "JOIN User u on u.id = s.story_user_id.id " + "JOIN Follower f ON f.follower_user_id_follower.id = u.id " + "JOIN User u2 ON f.follower_user_id.id = u2.id " + "WHERE UPPER(u2.name) LIKE  UPPER(:name) " + "AND f.id.status = 'ACCEPTED' " + "AND s.expiration = false " + "AND s.expiration_time > current_time() " + "ORDER BY s.create_at DESC")
    List<User> findUsersFriendsStory(@Param("name") String name);

    @Query("""
            SELECT new com.example.App.Dashbord.DTO.SearchDTO('person', u.id, u.name) FROM User u WHERE u.name LIKE CONCAT(:name, '%')
                AND (:type = 'all' OR :type = 'person')
            UNION 
            SELECT new com.example.App.Dashbord.DTO.SearchDTO('group', g.id, g.name) FROM Group g WHERE g.name LIKE CONCAT(:name, '%')
                AND (:type = 'all' OR :type = 'group')
            UNION 
            SELECT new com.example.App.Dashbord.DTO.SearchDTO('tag', t.id, t.name) FROM Hashtag t WHERE t.name LIKE CONCAT(:name, '%')
            """)
    List<SearchDTO> findSuggestersSearch(@Param("name") String name, @Param("type") String type, Pageable pageable);

    @Query("""
                SELECT DISTINCT u FROM User u WHERE u.name LIKE CONCAT(:search, '%')
            """)
    List<User> findUsersBySearch(@Param("search") String search);

    @Query("""
            SELECT DISTINCT u FROM User u LEFT JOIN u.user_hashtag_id hs WHERE hs.name IN :hashtags 
                ORDER BY u.date_create DESC, u.date_last_update DESC
            """)
    List<User> findUsersByTags(@Param("hashtags") List<String> hashtags);

    @Query("""
                SELECT DISTINCT f  FROM Follower f WHERE (f.follower_user_id.name = :name OR f.follower_user_id_follower.name = :name)
                    AND f.id.status <> 'BLOCK'
            """)
    List<Follower> findMutualFriends(@Param("name") String name);








}
