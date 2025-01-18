package com.example.App.Dashbord.DTO;

import com.example.App.Dashbord.Model.Follower;
import com.example.App.Dashbord.Model.User;
import com.example.App.Messenger.Model.Group;
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
    private List<User> friends;
    private List<User> followers;
    private Long users;
}
