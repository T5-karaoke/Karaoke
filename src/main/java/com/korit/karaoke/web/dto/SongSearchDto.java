package com.korit.karaoke.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
public class SongSearchDto {
    private int page;
    private String searchValue;
    private List<String> categories;
    private int count;

    @ApiModelProperty(hidden = true)
    private int index;

    public void setIndex() {
        index = (page - 1) * count;
    }
}
