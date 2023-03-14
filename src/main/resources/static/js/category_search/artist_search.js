window.onload = () => {
    HeaderService.getInstance().loadHeader();

    if(localStorage.getItem("searchValue") != null) {
        searchObj.searchValue = localStorage.getItem("searchValue");
    }
    ComponentComposerEvent.getInstance().getArtistSearchEvent();

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
    getArtistList(searchObj){

        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/search/artist",
            data: searchObj,
            dataType: "json",

            success: response => {
                console.log(response);
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
    
    getArtistSearchEvent() {
        const responseData = SongSearchApi.getInstance().getArtistList(searchObj);
        const SearchBody = document.querySelector(".composer tbody");
        const SongSearchBody = document.querySelector(".search_composer_tit");

        SearchBody.innerHTML = "";
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
                }
            else{
                SearchBody.innerHTML = 
                    `<p>아티스트 검색 결과가 없습니다.<p>`;
                SongSearchBody.innerHTML =
                    `<p><a href=""> 아티스트 <b class="search-count"> 0 </b>개의 검색결과</a></p>`;
                }
            });
        }
        else{
            SearchBody.innerHTML = 
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

            ComponentComposerEvent.getInstance().getArtistSearchEvent();
        }
        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                
                searchButton.click();
            }
        }

    }
}