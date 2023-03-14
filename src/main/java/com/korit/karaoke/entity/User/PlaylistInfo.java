package com.korit.karaoke.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PlaylistInfo {
    private int playlistInfoId;
    private int userId;
    private String title;
    private String introduction;
}
