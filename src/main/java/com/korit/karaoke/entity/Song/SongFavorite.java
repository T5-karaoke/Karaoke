package com.korit.karaoke.entity.Song;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SongFavorite {
    private int infoId;
    private int songId;
    private int userId;
    private int favorite;
}
