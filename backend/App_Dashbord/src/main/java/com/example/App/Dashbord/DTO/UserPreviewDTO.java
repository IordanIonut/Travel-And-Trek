package com.example.App.DTO;

import com.example.App.Model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserPreviewDTO {
    private Optional<User> user;
    private Long postsCount;
    private Long followersCount;
    private Long followingsCount;
}
