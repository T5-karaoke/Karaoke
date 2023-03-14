package com.korit.karaoke.entity.Song;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SongImage {
    private int imageId;
    private String songCode;
    private String saveName;
    private String originName;
}
