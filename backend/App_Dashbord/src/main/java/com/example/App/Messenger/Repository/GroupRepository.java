package com.example.App.Messenger.Repository;

import com.example.App.Dashbord.Model.User;
import com.example.App.Messenger.Enum.GroupMembershipEnum;
import com.example.App.Messenger.Model.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    @Query("""
    SELECT DISTINCT g, gm, u, f FROM Group g
        LEFT JOIN GroupMembership gm ON gm.group_id.id = g.id
        LEFT JOIN Follower f ON gm.user_id.id = f.follower_user_id.id  OR gm.user_id.id = f.follower_user_id_follower.id
        LEFT JOIN FETCH User u ON gm.user_id.id = u.id
        WHERE g.name LIKE CONCAT(:search, '%')
            AND ((f.follower_user_id.name = :name 
            OR f.follower_user_id_follower.name = :name 
            AND f.id.status = 'ACCEPTED' AND gm.user_id.name = :name)  
            
            OR ((f.follower_user_id.name <> :name 
            OR f.follower_user_id_follower.name <> :name 
            AND gm.user_id.name <> :name) ))
        ORDER BY f.created_at DESC
""")
    List<Object[]> findGroupsByName(@Param("name") String name, @Param("search") String search);

    @Query("SELECT g FROM Group g WHERE g.name = :name")
    Optional<Group> existsByName(@Param("name") String name);

    @Query("SELECT g FROM Group g WHERE g.name = :name ")
    Group getGroupDetails(@Param("name") String name);

    @Query("SELECT DISTINCT COUNT(p.id) FROM Post p WHERE p.post_group_id.name = :name")
    Long getNumberOfPostings(@Param("name") String name);

    @Query("SELECT DISTINCT COUNT(gm.id) FROM GroupMembership gm where gm.group_id.name = :name AND gm.id.role = :role")
    Long getNumberOfMembersByRole(@Param("name") String name, @Param("role") GroupMembershipEnum role);
}
