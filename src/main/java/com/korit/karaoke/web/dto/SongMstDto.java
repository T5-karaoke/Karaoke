package com.korit.karaoke.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SongMstDto {

    private String searchValue;

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

    @NotBlank
    @ApiModelProperty(value = "전체 조회 = N 조건검색 = Y", required = true, notes = "전체조회 = N, 조회제한 = Y")
    private String limit;



    @ApiModelProperty(value = "페이지", required = false, example = "1")
    private int page;
    @ApiModelProperty(value = "검색 갯수", required = false, example = "20")
    private int count;

    @ApiModelProperty(hidden = true)
    private int index;

    public void setIndex(){
        index = (page -1) * count;
    }
}
