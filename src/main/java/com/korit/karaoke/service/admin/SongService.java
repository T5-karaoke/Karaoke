package com.korit.karaoke.service.admin;

import com.korit.karaoke.entity.CategoryView;
import com.korit.karaoke.entity.Song.SongMst;
import com.korit.karaoke.exception.CustomValidationException;
import com.korit.karaoke.repository.admin.SongRepository;
import com.korit.karaoke.web.dto.DeleteSongsReqDto;
import com.korit.karaoke.web.dto.SearchNumberListReqDto;
import com.korit.karaoke.web.dto.SearchReqDto;
import com.korit.karaoke.web.dto.SongReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SongService {

    @Autowired
    private SongRepository songRepository;

    public List<SongMst> searchSong(SearchReqDto searchReqDto) {
        searchReqDto.setIndex();
        return songRepository.searchSong(searchReqDto);
    }

    public int getSongTotalCount(SearchNumberListReqDto searchNumberListReqDto) {
        return songRepository.getSongTotalCount(searchNumberListReqDto);
    }

    public List<CategoryView> getCategories() {
        return songRepository.findAllCategory();
    }

    public void registerSong(SongReqDto songReqDto) {
        duplicateSongCode(songReqDto.getSongCode());
        songRepository.saveSong(songReqDto);
    }

    private void duplicateSongCode(int songCode) {
        SongMst songMst = songRepository.findSongBySongCode(songCode);
        if(songMst != null) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("songCode", "이미 존재하는 노래코드입니다.");

            throw new CustomValidationException(errorMap);
        }
    }

    public void modifySong(SongReqDto songReqDto) {
        songRepository.UpdateSongBySongCode(songReqDto);
    }

    public void removeSong(int songId) {
        songRepository.deleteSong(songId);
    }

    public void removeSongs(DeleteSongsReqDto deleteSongsReqDto) {
        songRepository.deleteSongs(deleteSongsReqDto.getUserIds());
    }

    public SongMst getSongCode(String songCode) {
        return songRepository.findSongBySong(songCode);
    }
}
