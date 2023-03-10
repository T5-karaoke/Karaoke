window.onload = () => {
    HeaderService.getInstance().loadHeader();
    
    if(localStorage.getItem("searchValue") != null) {
        searchObj.searchValue = localStorage.getItem("searchValue");
    }
    ComponentComposerEvent.getInstance().getLyricistSearchEvent();

    ComponentEvent.getInstance().addClickEventSearchButton();

}

const searchObj = {
    page: 1,
    searchValue: null,
    count : 9999
}

class SongSearchApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new SongSearchApi();
        }
        return this.#instance;
    }
    getLyricistList(searchObj){

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


class ComponentComposerEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new ComponentComposerEvent();
        }
        return this.#instance;
    }
    
    getLyricistSearchEvent() {
        const responseData = SongSearchApi.getInstance().getLyricistList(searchObj);
        const SearchBody = document.querySelector(".composer tbody");
        const SongSearchBody = document.querySelector(".search_composer_tit");

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
                    `<p>????????? ?????? ????????? ????????????.<p>`;
                SongSearchBody.innerHTML =
                    `<p><a href=""> ????????? <b class="search-count"> 0 </b>?????? ????????????</a></p>`;
                }
            });
        }
        else{
            SearchBody.innerHTML = 
                `<p>????????? ?????? ????????? ????????????.<p>`;
            SongSearchBody.innerHTML =
                `<p><a href=""> ????????? <b class="search-count"> 0 </b>?????? ????????????</a></p>`;
            }

        responseData.forEach((data, index) => {
            SongSearchBody.innerHTML =`
            <p><a href=""> ????????? <b class="search-count">${data.lyricistCount}</b> ?????? ????????????</a></p>
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

            ComponentComposerEvent.getInstance().getLyricistSearchEvent();
        }
        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                
                searchButton.click();
            }
        }

    }
}