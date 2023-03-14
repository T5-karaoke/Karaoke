package com.korit.karaoke.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/search")
public class SearchController {

    // total_search
    @GetMapping("")
    public String totalSearch() {
        return "search/total_search";
    }

    @GetMapping("/recent")
    public String recentSearch() {
        return "search/recent_search";
    }

    @GetMapping("/lts")
    public String ltsSearch() {
        return "search/lts_search";
    }


    // total_search in category

    @GetMapping("/songname")
    public String songNameSearch() {
        return "category_search/songname_search";
    }
    @GetMapping("/songcode")
    public String songCodeSearch() {
        return "category_search/songcode_search";
    }
    @GetMapping("/artist")
    public String artistSearch() {
        return "category_search/artist_search";
    }
    @GetMapping("/lyricist")
    public String lyricistSearch() {
        return "category_search/lyricist_search";
    }
    @GetMapping("/composer")
    public String composerSearch() {
        return "category_search/composer_search";
    }


}
