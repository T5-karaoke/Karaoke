package com.korit.karaoke.Repository;

import com.korit.karaoke.entity.Song.SongMst;
import com.korit.karaoke.web.dto.SongSearchDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SearchRepository {

    public List<SongMst> userSearchSongName(SongSearchDto songSearchDto);

    public List<SongMst> userSearchArtist(SongSearchDto songSearchDto);

    public List<SongMst> userSearchSongCode(SongSearchDto songSearchDto);

    public List<SongMst> userSearchComposer(SongSearchDto songSearchDto);

    public List<SongMst> userSearchLyricist(SongSearchDto songSearchDto);

    public List<SongMst> userRecentList(SongSearchDto songSearchDto);

    public List<SongMst> userPopularityList(SongSearchDto songSearchDto);
}
