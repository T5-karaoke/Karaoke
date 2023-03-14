package com.korit.karaoke.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class PlaylistInfoReqDto {
    @ApiModelProperty(hidden = true)
    private int playlistInfoId;

    @ApiModelProperty(value = "유저 ID값", example = "1")
    private int userId;

    @ApiModelProperty(value = "플레이리스트 제목", example = "홍길동님의 플레이리스트")
    private String title;

    @ApiModelProperty(value = "노래 ID값", example = "분위기 좋은 노래 모음집")
    private String introduction;
}
