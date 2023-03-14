package com.korit.karaoke.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class MyPageController {

    @GetMapping("/playlist/modify")
    public String playlist() {
        return "playlist_modify";
    }
}
