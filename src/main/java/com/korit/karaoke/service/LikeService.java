package com.korit.karaoke.service;

import com.korit.karaoke.entity.Song.SongLike;
import com.korit.karaoke.exception.CustomLikeException;
import com.korit.karaoke.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;

    public int like(int songId, int userId){
        SongLike songLike = SongLike.builder()
                .songId(songId)
                .userId(userId)
                .build();
        if (likeRepository.getLikeStatus(songLike) > 0){
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("likeError","좋아요를 취소해주세요");
            throw new CustomLikeException(errorMap);
        }

        likeRepository.addLike(songLike);
        return likeRepository.getLikeCount(songId);

    }

    public int disLike(int songId, int userId){
        SongLike songLike = SongLike.builder()
                .songId(songId)
                .userId(userId)
                .build();

        if(likeRepository.getLikeStatus(songLike) == 0){
            Map<String,String> errorMap = new HashMap<>();
            errorMap.put("likeError", "좋아요를 눌러주세요");
            throw new CustomLikeException(errorMap);

        }

        likeRepository.deleteLike(songLike);
        return  likeRepository.getLikeCount(songId);

    }


}
