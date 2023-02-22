package com.korit.karaoke.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SongMstDto {

    @ApiModelProperty(hidden = true)
    private int singId;

    @ApiModelProperty(value = "노래방번호", example = "999999")
    private String songCode;

    @ApiModelProperty(value = "곡명", example = "노래이름 테스트")
    private String songName;

    @ApiModelProperty(value = "아티스트", example = "테스트")
    private String artist;

    @ApiModelProperty(value = "작곡가", example = "테스트")
    private String composer;

    @ApiModelProperty(value = "작사가", example = "테스트")
    private String lyricist;

    @ApiModelProperty(value = "발매일", example = "2023-02-21")
    private LocalDate publicationDate;

    @ApiModelProperty(value = "장르", example = "테스트")
    private String category;


}
