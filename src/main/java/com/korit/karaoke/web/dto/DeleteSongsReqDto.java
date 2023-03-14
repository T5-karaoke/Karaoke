package com.korit.karaoke.web.dto;

import lombok.Data;

import java.util.List;
@Data
public class DeleteSongsReqDto {
    private List<Integer> userIds;
}
