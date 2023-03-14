package com.korit.karaoke.web.api;

import com.korit.karaoke.aop.annotation.ParamsAspect;
import com.korit.karaoke.entity.Song.SongMst;
import com.korit.karaoke.service.ChartService;
import com.korit.karaoke.web.dto.CMRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")

public class ChartAApi {

    private final ChartService chartService;

    // 메인화면 인기차트 리스트
    @ParamsAspect
    @GetMapping("/index/popularity/day")
    public ResponseEntity<CMRespDto<List<SongMst>>> getPopularityDayList(){

        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",
                        chartService.getPopularityDyList()));
    }
}
