package com.korit.karaoke.repository;

import com.korit.karaoke.entity.Song.SongLike;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LikeRepository {

    public int addLike(SongLike songLike);

    public int deleteLike(SongLike songLike);

    public int getLikeStatus(SongLike songLike);

    public int getLikeCount(int songId);



}
