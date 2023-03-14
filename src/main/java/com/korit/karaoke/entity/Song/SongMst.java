package com.korit.karaoke.entity.Song;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SongMst {
    private int songId;
    private int songCode;
    private String songName;
    private String artist;
    private String composer;
    private String lyricist;
    private LocalDate publicationDate;
    private String category;

    private int songNameCount;
    private int artistCount;
    private int songCodeCount;
    private int composerCount;
    private int lyricistCount;
}
