package com.korit.karaoke.Repository;

import com.korit.karaoke.entity.Song.SongMst;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ChartRepository {
    public List<SongMst> userPopularityList();

}
