package com.example.App.DTO;

import com.example.App.Model.Highlight;
import com.example.App.Model.User;
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
