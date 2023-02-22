package com.korit.karaoke.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PlaylistMst {
    private int playlistId;
    private int userId;

    private LocalDate createDate;
    private LocalDate updateDate;
}
