package com.korit.karaoke.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PlaylistImage {
    private int imageId;
    private int userId;
    private String saveName;
    private String originName;
}
