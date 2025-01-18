package com.example.App.Messenger.DTO;

import com.example.App.Dashbord.Model.User;
import com.example.App.Messenger.Model.Group;
import com.example.App.Messenger.Model.GroupMembership;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GroupDTO {
    private Group group;
    private GroupMembership groupMembership;
    private List<User> friends;
    private List<User> followers;
    private Long users;
}
