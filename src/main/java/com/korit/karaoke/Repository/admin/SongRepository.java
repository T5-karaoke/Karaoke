package com.korit.karaoke.repository.admin;

import com.korit.karaoke.entity.CategoryView;
import com.korit.karaoke.entity.Song.SongMst;
import com.korit.karaoke.web.dto.DeleteSongsReqDto;
import com.korit.karaoke.web.dto.SearchNumberListReqDto;
import com.korit.karaoke.web.dto.SearchReqDto;
import com.korit.karaoke.web.dto.SongReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SongRepository {

    public List<SongMst> searchSong(SearchReqDto searchReqDto);
    public int getSongTotalCount(SearchNumberListReqDto searchNumberListReqDto);
    public List<CategoryView> findAllCategory();
    public int saveSong(SongReqDto songReqDto);
    public int UpdateSongBySongCode(SongReqDto songReqDto);
    public int deleteSong(int songId);
    public int deleteSongs(List<Integer> userIds);
    public SongMst findSongBySong(String songCode);
    public SongMst findSongBySongCode(int songCode);
}
