window.onload = () => {
    HeaderService.getInstance().loadHeader();

    if(localStorage.getItem("searchValue") != null) {
        searchObj.searchValue = localStorage.getItem("searchValue");
    }
    
    SongService.getInstance().loadSongNameSearchList();
    SongService.getInstance().loadArtistSearchList();
    SongService.getInstance().loadSongCodeSearchList();
    SongService.getInstance().loadComposerSearchList();
    SongService.getInstance().loadLyricistSearchList();

    ComponentEvent.getInstance().addClickEventSearchButton();

    SongService.getInstance().onLoadSearch();
}


const searchObj = {
    page: 1,
    searchValue: null,
    count : 5
}

class SongSearchApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new SongSearchApi();
        }
        return this.#instance;
    }

    getSongList(){

        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/search",
            data: searchObj,
            dataType: "json",

            success: response => {
                returnData = response.data;
                
            },
            error: error => {
                console.log(error);
            }
        })
        return returnData;
    }


    getSongNameList(){

        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/search/songname",
            data: searchObj,
            dataType: "json",

            success: response => {
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        })
        return returnData;
    }

    getArtistList(){

        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/search/artist",
            data: searchObj,
            dataType: "json",

            success: response => {
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        })
        return returnData;
    }
    getSongCodeList(){

        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/search/songcode",
            data: searchObj,
            dataType: "json",

            success: response => {
                console.log(response)
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        })
        return returnData;
    }
    getComposerList(){

        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/search/composer",
            data: searchObj,
            dataType: "json",

            success: response => {
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        })
        return returnData;
    }
    getLyricistList(){

        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/search/lyricist",
            data: searchObj,
            dataType: "json",

            success: response => {
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        })
        return returnData;
    }
}

class SongService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new SongService();
        }
        return this.#instance;
    }

    onLoadSearch(){
        const URLSearch = new URLSearchParams(location.search);

        // console.log(URLSearch);

        if(URLSearch.has("searchValue")){

            const searchValue = URLSearch.get('searchValue');
            if(searchValue == ''){
                return;
            }
            const searchInput = document.querySelector('.search-input');
            searchInput.value = searchValue;
            const searchButton = document.querySelector('.search-button');
            searchButton.click();
        }
    }

    loadSongNameSearchList(){
        const responseData = SongSearchApi.getInstance().getSongNameList();
        const SearchBody = document.querySelector(".songName tbody");
        const SongSearchBody = document.querySelector(".search_songname_tit");

        SearchBody.innerHTML = "";
        SongSearchBody.innerHTML = "";
        
        if(responseData != null && responseData != 0){
            responseData.forEach((data, index) => {
        if(data.songName != null && data.songName != 0){
            SearchBody.innerHTML += `
            <tr class="content-list1">
                <th><input type="checkbox" class="delete-checkall"></th>
                <th>${data.songCode}</th>
                <th class="content-song-name">${data.songName}<img src="/static/images/gasa.png"></th>
                <th>${data.artist}</th>
                <th>${data.composer}</th>
                <th>${data.lyricist}</th>
                <th>${data.publicationDate}</th>
                <th><img src="/static/images/lts.png"></th>
                <th><img src="/static/images/chart_mic.png"></th>
                <th><img src="/static/images/plus.png"></th>
            </tr>
                    `;
                }
            else{
                SearchBody.innerHTML = 
                    `<p>곡명 검색 결과가 없습니다.<p>`;
                SongSearchBody.innerHTML =
                    `<p><a href=""> 곡명 <b class="search-count"> 0 </b>개의 검색결과</a></p>`;
                }
            });
        }
        else{
            SearchBody.innerHTML = 
                `<p>곡명 검색 결과가 없습니다.<p>`;
            SongSearchBody.innerHTML =
                `<p><a href=""> 곡명 <b class="search-count"> 0 </b>개의 검색결과</a></p>`;
            }


        responseData.forEach((data, index) => {
            SongSearchBody.innerHTML =`
                <p><a href=""> 곡명 <b class="search-count">${data.songNameCount}</b> 개의 검색결과</a></p>
            `;
            });
        }
        

        
    loadArtistSearchList(){
        const responseData = SongSearchApi.getInstance().getArtistList();
        const SearchBody = document.querySelector(".artist tbody");
        const SongListBody = document.querySelector(".no_results");
        const SongSearchBody = document.querySelector(".search_artist_tit");

        SearchBody.innerHTML = "";
        SongListBody.innerHTML = "";
        SongSearchBody.innerHTML = "";

        if(responseData != null && responseData != 0){
            responseData.forEach((data, index) => {
        if(data.artist != null && data.artist != 0){
            SearchBody.innerHTML += `
            <tr class="content-list1">
                <th><input type="checkbox" class="delete-checkall"></th>
                <th>${data.songCode}</th>
                <th class="content-song-name">${data.songName}<img src="/static/images/gasa.png"></th>
                <th>${data.artist}</th>
                <th>${data.composer}</th>
                <th>${data.lyricist}</th>
                <th>${data.publicationDate}</th>
                <th><img src="/static/images/lts.png"></th>
                <th><img src="/static/images/chart_mic.png"></th>
                <th><img src="/static/images/plus.png"></th>
            </tr>
                    `;
            SongListBody.innerHTML = `
            <p class="art_name"><a href="">${data.artist}</a></p>
                `;
                }
            else{
                SearchBody.innerHTML = 
                    `<p>아티스트 검색 결과가 없습니다.<p>`;
                SongListBody.innerHTML = 
                    `<p>아티스트 검색 결과가 없습니다.<p>`;
                SongSearchBody.innerHTML =
                    `<p><a href=""> 아티스트 <b class="search-count"> 0 </b>개의 검색결과</a></p>`;
                }
            });
        }
        else{
            SearchBody.innerHTML = 
                `<p>아티스트 검색 결과가 없습니다.<p>`;
            SongListBody.innerHTML = 
                `<p>아티스트 검색 결과가 없습니다.<p>`;
            SongSearchBody.innerHTML =
                `<p><a href=""> 아티스트 <b class="search-count"> 0 </b>개의 검색결과</a></p>`;
            }

        responseData.forEach((data, index) => {
            SongSearchBody.innerHTML =`
            <p><a href=""> 아티스트 <b class="search-count">${data.artistCount}</b> 개의 검색결과</a></p>
                `;
            });
        }
    loadSongCodeSearchList(){
        const responseData = SongSearchApi.getInstance().getSongCodeList();
        const SearchBody = document.querySelector(".songcode tbody");
        const SongSearchBody = document.querySelector(".search_songcode_tit");
    
        SearchBody.innerHTML = "";
        SongSearchBody.innerHTML = "";

        if(responseData != null && responseData != 0){
            responseData.forEach((data, index) => {
        if(data.songCode != null && data.songCode != 0){
            SearchBody.innerHTML += `
            <tr class="content-list1">
                <th><input type="checkbox" class="delete-checkall"></th>
                <th>${data.songCode}</th>
                <th class="content-song-name">${data.songName}<img src="/static/images/gasa.png"></th>
                <th>${data.artist}</th>
                <th>${data.composer}</th>
                <th>${data.lyricist}</th>
                <th>${data.publicationDate}</th>
                <th><img src="/static/images/lts.png"></th>
                <th><img src="/static/images/chart_mic.png"></th>
                <th><img src="/static/images/plus.png"></th>
            </tr>
                    `;
                }
            else{
                SearchBody.innerHTML = 
                    `<p>곡번호 검색 결과가 없습니다.<p>`;
                SongSearchBody.innerHTML =
                    `<p><a href=""> 곡번호 <b class="search-count"> 0 </b>개의 검색결과</a></p>`;
                }
            });
        }
        else{
            SearchBody.innerHTML = 
                `<p>곡번호 검색 결과가 없습니다.<p>`;
            SongSearchBody.innerHTML =
                `<p><a href=""> 곡번호 <b class="search-count"> 0 </b>개의 검색결과</a></p>`;
            }
            

        responseData.forEach((data, index) => {
            SongSearchBody.innerHTML =`
            <p><a href=""> 곡번호 <b class="search-count">${data.songCodeCount}</b> 개의 검색결과</a></p>
                `;
            });
        }

    loadComposerSearchList(){
        const responseData = SongSearchApi.getInstance().getComposerList();
        const SearchBody = document.querySelector(".composer tbody");
        const SongSearchBody = document.querySelector(".search_composer_tit");

        SearchBody.innerHTML = "";
        SongSearchBody.innerHTML = "";

        if(responseData != null && responseData != 0){
            responseData.forEach((data, index) => {
        if(data.composer != null && data.composer != 0){
            SearchBody.innerHTML += `
            <tr class="content-list1">
                <th><input type="checkbox" class="delete-checkall"></th>
                <th>${data.songCode}</th>
                <th class="content-song-name">${data.songName}<img src="/static/images/gasa.png"></th>
                <th>${data.artist}</th>
                <th>${data.composer}</th>
                <th>${data.lyricist}</th>
                <th>${data.publicationDate}</th>
                <th><img src="/static/images/lts.png"></th>
                <th><img src="/static/images/chart_mic.png"></th>
                <th><img src="/static/images/plus.png"></th>
            </tr>
                    `;
                }
            else{
                SearchBody.innerHTML = 
                    `<p>작곡가 검색 결과가 없습니다.<p>`;
                SongSearchBody.innerHTML =
                    `<p><a href=""> 작곡가 <b class="search-count"> 0 </b>개의 검색결과</a></p>`;
                }
            });
        }
        else{
            SearchBody.innerHTML = 
                `<p>작곡가 검색 결과가 없습니다.<p>`;
            SongSearchBody.innerHTML =
                `<p><a href=""> 작곡가 <b class="search-count"> 0 </b>개의 검색결과</a></p>`;
            }


        responseData.forEach((data, index) => {
            SongSearchBody.innerHTML =`
            <p><a href=""> 작곡가 <b class="search-count">${data.composerCount}</b> 개의 검색결과</a></p>
            `;
        });
    }
    loadLyricistSearchList(){
        const responseData = SongSearchApi.getInstance().getLyricistList();
        const SearchBody = document.querySelector(".lyricist tbody");
        const SongSearchBody = document.querySelector(".search_lyricist_tit");

        SearchBody.innerHTML = "";
        SongSearchBody.innerHTML = "";
        

        if(responseData != null && responseData != 0){
            responseData.forEach((data, index) => {
        if(data.lyricist != null && data.lyricist != 0){
            SearchBody.innerHTML += `
            <tr class="content-list1">
                <th><input type="checkbox" class="delete-checkall"></th>
                <th>${data.songCode}</th>
                <th class="content-song-name">${data.songName}<img src="/static/images/gasa.png"></th>
                <th>${data.artist}</th>
                <th>${data.composer}</th>
                <th>${data.lyricist}</th>
                <th>${data.publicationDate}</th>
                <th><img src="/static/images/lts.png"></th>
                <th><img src="/static/images/chart_mic.png"></th>
                <th><img src="/static/images/plus.png"></th>
            </tr>
                    `;
                }
            else{
                SearchBody.innerHTML = 
                    `<p>작사가 검색 결과가 없습니다.<p>`;
                SongSearchBody.innerHTML =
                    `<p><a href=""> 작사가 <b class="search-count"> 0 </b>개의 검색결과</a></p>`;
                }
            });
        }
        else{
            SearchBody.innerHTML = 
                `<p>작사가 검색 결과가 없습니다.<p>`;
            SongSearchBody.innerHTML =
                `<p><a href=""> 작사가 <b class="search-count"> 0 </b>개의 검색결과</a></p>`;
            }

        responseData.forEach((data, index) => {
            SongSearchBody.innerHTML =`
            <p><a href=""> 작사가 <b class="search-count">${data.lyricistCount}</b> 개의 검색결과</a></p>
            `;
        });
    }
}




class ComponentEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }
    
    addClickEventSearchButton() {
        const searchInput = document.querySelector(".search-input");
        const searchButton = document.querySelector(".search-button");

        searchButton.onclick = () => {

            localStorage.setItem("searchValue", searchInput.value);
            searchObj.searchValue = localStorage.getItem("searchValue");

            SongService.getInstance().loadSongNameSearchList();
            SongService.getInstance().loadArtistSearchList();
            SongService.getInstance().loadSongCodeSearchList();
            SongService.getInstance().loadComposerSearchList();
            SongService.getInstance().loadLyricistSearchList();
        }
        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                
                searchButton.click();
                
            }
        }

    }
}
