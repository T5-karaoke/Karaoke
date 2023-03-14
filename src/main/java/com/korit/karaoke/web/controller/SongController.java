package com.korit.karaoke.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/song")
public class SongController {

    @GetMapping("/search")
    public String search() {
        return "song/song_search";
    }
}
