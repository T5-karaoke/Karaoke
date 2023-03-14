window.onload = () => {
    HeaderService.getInstance().loadHeader();
    
    SongService.getInstance().loadRecentSearchList();
}

const searchObj = {
    page: 1,
    searchValue: null,
    count : 20
}

class SongSearchApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new SongSearchApi();
        }
        return this.#instance;
    }

    getRecentList(searchObj){

        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/search/recent",
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
loadRecentSearchList(){
    const responseData = SongSearchApi.getInstance().getRecentList(searchObj);
    const SearchBody = document.querySelector(".recent tbody");

    console.log(responseData);

    SearchBody.innerHTML = "";

    responseData.forEach((data, index) => {
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
        });
    }
}