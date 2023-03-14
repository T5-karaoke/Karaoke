package com.korit.karaoke.service;

import com.korit.karaoke.entity.User.PlaylistDtl;
import com.korit.karaoke.entity.User.PlaylistImage;
import com.korit.karaoke.entity.Song.SongMst;
import com.korit.karaoke.exception.CustomValidationException;
import com.korit.karaoke.repository.PlaylistRepository;
import com.korit.karaoke.web.dto.PlaylistDtlDto;
import com.korit.karaoke.web.dto.PlaylistInfoReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class PlaylistService {

    @Value("${file.path}")
    private String filePath;

    @Autowired
    private PlaylistRepository playlistRepository;

    //이미지 등록
    public void registerPlaylistImages(int userId, List<MultipartFile> files) {
        if(files.size() < 1) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("files", "이미지를 선택하세요.");

            throw new CustomValidationException(errorMap);
        }

        List<PlaylistImage> playlistImages = new ArrayList<PlaylistImage>();

        files.forEach(file -> {
            String originFileName = file.getOriginalFilename();
            String extension = originFileName.substring(originFileName.lastIndexOf("."));
            String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + extension;

            Path uploadPath = Paths.get(filePath + "playlist/" + tempFileName);

            File f = new File(filePath + "playlist");
            if(!f.exists()) {
                f.mkdirs();
            }

            try {
                Files.write(uploadPath, file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            PlaylistImage playlistImage = PlaylistImage.builder()
                    .userId(userId)
                    .saveName(tempFileName)
                    .originName(originFileName)
                    .build();

            playlistImages.add(playlistImage);
        });

        playlistRepository.registerPlaylistImages(playlistImages);
    }

    //이미지 수정
    public void modifyPlaylistImage(int userId, int imageId, List<MultipartFile> files) {
        PlaylistImage playlistImage = playlistRepository.findPlaylistImageByImageId(imageId);


        if (playlistImage != null) {
            removePlaylistImage(imageId);
        }

        if (playlistImage == null) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("files", "이미지를 등록 후 수정이 가능합니다.");

            throw new CustomValidationException(errorMap);
        }

        if(files.size() < 1) {}
        registerPlaylistImages(userId, files);
    }

    //이미지 삭제
    public void removePlaylistImage(int imageId) {
        PlaylistImage playlistImage = playlistRepository.findPlaylistImageByImageId(imageId);

        if(playlistImage == null) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("error", "존재하지 않는 노래이미지 ID입니다.");

            throw new CustomValidationException(errorMap);
        }

        if(playlistRepository.deletePlaylistImage(imageId) > 0) {
            File file = new File(filePath + "playlist/" + playlistImage.getSaveName());
            if(file.exists()) {
                file.delete();
            }
        }
    }

    //플레이리스트 정보 등록
    public void registerPlaylistInfo(PlaylistInfoReqDto playlistInfoReqDto) {
        playlistRepository.savePlaylistInfo(playlistInfoReqDto);
    }

    //플레이리스트 정보 수정
    public void modifyPlaylistInfo(PlaylistInfoReqDto playlistInfoReqDto) {
        playlistRepository.UpdatePlaylistInfoByUserId(playlistInfoReqDto);
    }

    public List<PlaylistDtl> getUserPlaylist(int userId) {
        return playlistRepository.findUserPlaylistByUserId(userId);
    }

    public void registerUserPlaylist(PlaylistDtlDto playlistDtlDto) {
        playlistRepository.saveUserPlaylist(playlistDtlDto);
    }

    public void removeUserPlaylist(int songId) {
        playlistRepository.deleteUserPlaylist(songId);
    }
}
