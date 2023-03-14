package com.korit.karaoke.repository;


import com.korit.karaoke.entity.Song.SongFavorite;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FavoriteRepository {

    public int addFavorite(SongFavorite songFavorite);

    public int deleteFavorite(SongFavorite songFavorite);

    public int getFavoriteStatus(SongFavorite songFavorite);

    public int getFavoriteCount(int songId);

}
