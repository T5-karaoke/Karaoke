package com.korit.karaoke.service;

import com.korit.karaoke.Repository.ChartRepository;
import com.korit.karaoke.entity.Song.SongMst;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ChartService {

    private final ChartRepository chartRepository;

    public List<SongMst> getPopularityDyList(){
        return chartRepository.userPopularityList();
    }
}
