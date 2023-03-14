package com.korit.karaoke.web.api;


import com.korit.karaoke.aop.annotation.ParamsAspect;
import com.korit.karaoke.aop.annotation.ValidAspect;
import com.korit.karaoke.entity.User.PlaylistDtl;
import com.korit.karaoke.service.PlaylistService;
import com.korit.karaoke.web.dto.CMRespDto;
import com.korit.karaoke.web.dto.PlaylistDtlDto;
import com.korit.karaoke.web.dto.PlaylistInfoReqDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@Api(tags = {"유저 플레이리스트 API"})
@RequestMapping("api")
@RestController
public class PlaylistApi {

    @Autowired
    private PlaylistService playlistService;

    @ParamsAspect
    @PostMapping("playlist/{userId}/images")
    public ResponseEntity<CMRespDto<?>> registerPlaylistImg(@PathVariable int userId, @RequestPart List<MultipartFile> files) {
    playlistService.registerPlaylistImages(userId, files);
    return ResponseEntity
            .ok()
            .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @ParamsAspect
    @PostMapping("playlist/{userId}/modification/{imageId}")
    public ResponseEntity<CMRespDto<?>> modifyPlaylistImg(@PathVariable int userId, @PathVariable int imageId, @RequestPart List<MultipartFile> files) {

        playlistService.modifyPlaylistImage(userId, imageId, files);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @DeleteMapping("playlist/{userId}/image/{imageId}")
    public ResponseEntity<CMRespDto<?>> removePlaylistImg(@PathVariable int userId, @PathVariable int imageId) {

        playlistService.removePlaylistImage(imageId);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully" ,null));
    }

    @ParamsAspect
    @ValidAspect
    @PostMapping("playlist/playlistInfo")
    public ResponseEntity<CMRespDto<?>> registerPlaylistInfo(@PathVariable int userId, @Valid @RequestBody PlaylistInfoReqDto playlistInfoReqDto, BindingResult bindingResult) {
        playlistService.registerPlaylistInfo(playlistInfoReqDto);
        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Successfully",true));
    }

    @ParamsAspect
    @ValidAspect
    @PutMapping("playlist/playlistInfo/{userId}")
    public ResponseEntity<CMRespDto<?>> modifyPlaylistInfo(@PathVariable int userId,@Valid @RequestBody PlaylistInfoReqDto playlistInfoReqDto, BindingResult bindingResult) {
        playlistService.modifyPlaylistInfo(playlistInfoReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",true));
    }

    @ParamsAspect
    @GetMapping("playlist/{userId}/userplaylist")
    public ResponseEntity<CMRespDto<List<PlaylistDtl>>> getPlaylist(@PathVariable int userId) {
        List<PlaylistDtl> playlistDtls = playlistService.getUserPlaylist(userId);
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", playlistDtls));
    }

    @ParamsAspect
    @PostMapping("playlist/{userId}/userplaylist")
    public ResponseEntity<CMRespDto<?>> registerUserPlaylist(@PathVariable int userId, @Valid @RequestBody PlaylistDtlDto playlistDtlDto, BindingResult bindingResult) {
        playlistService.registerUserPlaylist(playlistDtlDto);
        return ResponseEntity
              .created(null)
              .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Successfully",true));
    }

    @DeleteMapping("playlist/{userId}/userplaylist/{songId}")
    public ResponseEntity<CMRespDto<?>> removeUserPlaylist(@PathVariable int userId, @PathVariable int songId) {
        playlistService.removeUserPlaylist(songId);
        return ResponseEntity
               .ok()
               .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",true));
    }
}