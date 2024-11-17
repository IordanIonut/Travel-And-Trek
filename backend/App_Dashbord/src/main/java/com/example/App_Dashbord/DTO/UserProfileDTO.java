package com.example.App_Dashbord.DTO;

import com.example.App_Dashbord.Model.Highlight;
import com.example.App_Dashbord.Model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Getter
@Setter
public class UserProfileDTO {
    private Optional<User> user;
    private Long postsCount;
    private Long followersCount;
    private Long followingsCount;
    private List<Highlight> highlights;
}
