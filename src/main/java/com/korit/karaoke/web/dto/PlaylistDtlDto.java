package com.korit.karaoke.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class PlaylistDtlDto {
    @ApiModelProperty(hidden = true)
    private int playlistDtlId;
    @ApiModelProperty(value = "유저 ID값", example = "1")
    private int userId;
    @ApiModelProperty(value = "노래 ID값", example = "1")
    private int songId;
}
