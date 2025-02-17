package com.example.App.Dashbord.DTO;

import com.example.App.Dashbord.Enum.LikeContentEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LikeDTO {
    private Long count;
    private LikeContentEnum content;
}
