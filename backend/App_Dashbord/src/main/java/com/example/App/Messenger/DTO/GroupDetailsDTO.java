package com.example.App.Messenger.DTO;

import com.example.App.Messenger.Model.Group;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GroupDetailsDTO {
    private Group group;
    private Long postCount;
    private Long membersCount;
    private Long adminCount;
}
