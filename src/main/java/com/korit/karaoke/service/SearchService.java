package com.korit.karaoke.service;

import com.korit.karaoke.Repository.SearchRepository;
import com.korit.karaoke.entity.Song.SongMst;
import com.korit.karaoke.web.dto.SongSearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor

public class SearchService {
    private final SearchRepository searchRepository;

    public List<SongMst> getSearchSongs(SongSearchDto songSearchDto){
        songSearchDto.setIndex();
        return searchRepository.userSearchSongName(songSearchDto);
    }


    public List<SongMst> getSearchSongName(SongSearchDto songSearchDto){
        return searchRepository.userSearchSongName(songSearchDto);
    }
    public List<SongMst> getUserSearchArtists(SongSearchDto songSearchDto){
        return searchRepository.userSearchArtist(songSearchDto);
    }

    public List<SongMst> getUserSearchSongCodes(SongSearchDto songSearchDto){
        return searchRepository.userSearchSongCode(songSearchDto);
    }
    public List<SongMst> getUserSearchComposers(SongSearchDto songSearchDto){
        return searchRepository.userSearchComposer(songSearchDto);
    }
    public List<SongMst> getUserSearchLyricists(SongSearchDto songSearchDto){
        return searchRepository.userSearchLyricist(songSearchDto);
    }



    public List<SongMst> getUserRecentSearch(SongSearchDto songSearchDto){
        return searchRepository.userRecentList(songSearchDto);
    }


    public List<SongMst> getUserPopularityList(SongSearchDto songSearchDto){
        return searchRepository.userPopularityList(songSearchDto);
    }
}
