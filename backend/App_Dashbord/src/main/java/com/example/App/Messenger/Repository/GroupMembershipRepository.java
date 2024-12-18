package com.example.App.Messenger.Repository;

import com.example.App.Messenger.Embedded.GroupMembershipId;
import com.example.App.Messenger.Model.GroupMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupMembershipRepository extends JpaRepository<GroupMembership, GroupMembershipId> {
    @Query("SELECT gm FROM GroupMembership gm INNER JOIN User u ON gm.user_id.id = u.id WHERE gm.user_id.id = :user AND gm.group_id.id = :group")
    List<GroupMembership> findGroupMembershipFindUserWithGroup(@Param("user") final Long userId, @Param("group") final Long groupId);
}
