window.onload = () => {
    HeaderService.getInstance().loadHeader();

    if(localStorage.getItem("searchValue") != null) {
        searchObj.searchValue = localStorage.getItem("searchValue");
    }
    ComponentComposerEvent.getInstance().getSongCodeSearchEvent();

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
    getSongCodeList(searchObj){

        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/search/songcode",
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
    
    getSongCodeSearchEvent() {
        const responseData = SongSearchApi.getInstance().getSongCodeList(searchObj);
        const SearchBody = document.querySelector(".composer tbody");
        const SongSearchBody = document.querySelector(".search_composer_tit");

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

            ComponentComposerEvent.getInstance().getSongCodeSearchEvent();
        }
        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                
                searchButton.click();
            }
        }

    }
}