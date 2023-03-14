package com.korit.karaoke.web.api;

import com.korit.karaoke.aop.annotation.ParamsAspect;
import com.korit.karaoke.entity.Song.SongMst;
import com.korit.karaoke.service.SearchService;
import com.korit.karaoke.web.dto.CMRespDto;
import com.korit.karaoke.web.dto.SongSearchDto;
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

public class SearchApi {

    private final SearchService searchService;

    // spare(미사용)
    @ParamsAspect
    @GetMapping("/search")
    public ResponseEntity<CMRespDto<List<SongMst>>> getSearchSongTotalCount(SongSearchDto songSearchDto){

        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",
                        searchService.getSearchSongs(songSearchDto)));
    }

    // 노래 제목 검색
    @ParamsAspect
    @GetMapping("/search/songname")
    public ResponseEntity<CMRespDto<List<SongMst>>> getSearchSongName(SongSearchDto songSearchDto){

        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",
                        searchService.getSearchSongName(songSearchDto)));
    }

    // 아티스트 검색
    @ParamsAspect
    @GetMapping("/search/artist")
    public ResponseEntity<CMRespDto<List<SongMst>>> getSearchArtistCount(SongSearchDto songSearchDto){

        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",
                        searchService.getUserSearchArtists(songSearchDto)));
    }

    // 노래 번호 검색
    @ParamsAspect
    @GetMapping("/search/songcode")
    public ResponseEntity<CMRespDto<List<SongMst>>> getSearchSongCodeCount(SongSearchDto songSearchDto){

        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",
                        searchService.getUserSearchSongCodes(songSearchDto)));
    }

    // 작곡가 검색
    @ParamsAspect
    @GetMapping("/search/composer")
    public ResponseEntity<CMRespDto<List<SongMst>>> getSearchComposerCount(SongSearchDto songSearchDto){

        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",
                        searchService.getUserSearchComposers(songSearchDto)));
    }

    // 작사가 검색
    @ParamsAspect
    @GetMapping("/search/lyricist")
    public ResponseEntity<CMRespDto<List<SongMst>>> getSearchLyricistCount(SongSearchDto songSearchDto){

        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",
                        searchService.getUserSearchLyricists(songSearchDto)));
    }

    // 최신곡 및 LTS
    @ParamsAspect
    @GetMapping("/search/recent")
    public ResponseEntity<CMRespDto<List<SongMst>>> getRecentSearch(SongSearchDto songSearchDto){

        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",
                        searchService.getUserRecentSearch(songSearchDto)));
    }


    // 메인화면 인기차트 리스트
    @ParamsAspect
    @GetMapping("/index/popularity")
    public ResponseEntity<CMRespDto<List<SongMst>>> getPopularityList(SongSearchDto songSearchDto){

        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",
                        searchService.getUserPopularityList(songSearchDto)));
    }
}
