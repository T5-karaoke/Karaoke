package com.korit.karaoke.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PlaylistDtl {
    private int playlistDtlId;
    private int playlistId;
    private int songId;
}