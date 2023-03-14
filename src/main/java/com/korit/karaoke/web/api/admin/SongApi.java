package com.korit.karaoke.web.api.admin;

import com.korit.karaoke.aop.annotation.ParamsAspect;
import com.korit.karaoke.aop.annotation.ValidAspect;
import com.korit.karaoke.entity.CategoryView;
import com.korit.karaoke.entity.Song.SongMst;
import com.korit.karaoke.service.admin.SongService;
import com.korit.karaoke.web.dto.*;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api(tags = {"관리자 노래관리 API"})
@RequestMapping("api/admin")
@RestController
public class SongApi {

    @Autowired
    private SongService songService;


    @GetMapping("/song/{songCode}")
    public ResponseEntity<CMRespDto<?>> getSongCode(@PathVariable String songCode) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", songService.getSongCode(songCode)));
    }

    @ParamsAspect
    @ValidAspect
    @GetMapping("/songs")
    public ResponseEntity<CMRespDto<List<SongMst>>> searchSong(@Valid SearchReqDto searchReqDto, BindingResult bindingResult) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", songService.searchSong(searchReqDto)));
    }

    @GetMapping("/songs/totalcount")
    public ResponseEntity<CMRespDto<?>> getSongTotalCount(SearchNumberListReqDto searchNumberListReqDto) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", songService.getSongTotalCount(searchNumberListReqDto)));
    }

    @GetMapping("/categories")
    public ResponseEntity<CMRespDto<List<CategoryView>>> getCategories() {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", songService.getCategories()));
    }

    @ParamsAspect
    @ValidAspect
    @PostMapping("/song")
    public ResponseEntity<CMRespDto<?>> registerSong(@Valid @RequestBody SongReqDto songReqDto, BindingResult bindingResult) {
        songService.registerSong(songReqDto);
        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Successfully",true));
    }

    @ParamsAspect
    @ValidAspect
    @PutMapping("/song/{songCode}")
    public ResponseEntity<CMRespDto<?>> modifySong(@PathVariable int songCode,@Valid @RequestBody SongReqDto songReqDto, BindingResult bindingResult) {
        songService.modifySong(songReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",true));
    }

    @ParamsAspect
    @DeleteMapping("/song/{songId}")
    public ResponseEntity<CMRespDto<?>> removeSong(@PathVariable int songId) {
        songService.removeSong(songId);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",true));
    }

    @ParamsAspect
    @DeleteMapping("/songs")
    public ResponseEntity<CMRespDto<?>> removeSongs(@RequestBody DeleteSongsReqDto deleteSongsReqDto) {
        songService.removeSongs(deleteSongsReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",true));
    }
}