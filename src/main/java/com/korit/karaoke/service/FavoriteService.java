package com.korit.karaoke.service;

import com.korit.karaoke.entity.Song.SongFavorite;

import com.korit.karaoke.exception.CustomLikeException;
import com.korit.karaoke.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;

    public int favorite(int songId, int userId) {
        SongFavorite songFavorite = SongFavorite.builder()

                .songId(songId)
                .userId(userId)
                .build();


        if (favoriteRepository.getFavoriteStatus(songFavorite) > 0) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("likeError", "애창곡 해제");
            throw new CustomLikeException(errorMap);
        }

        favoriteRepository.addFavorite(songFavorite);
        return favoriteRepository.getFavoriteCount(songId);


    }

    public int disFavorite(int songId, int userId) {
        SongFavorite songFavorite = SongFavorite.builder()
                .songId(songId)
                .userId(userId)
                .build();

        if (favoriteRepository.getFavoriteStatus(songFavorite) == 0) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("likeError", "애창곡 등록");
            throw new CustomLikeException(errorMap);

        }

        favoriteRepository.deleteFavorite(songFavorite);
        return favoriteRepository.getFavoriteCount(songId);

    }


}
