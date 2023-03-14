window.onload = () => {
    HeaderService.getInstance().loadHeader();

    PopularityDayService.getInstance().loadPopularityDayList();
}

const searchObj = {
    page: 1,
    searchValue: null,
    count : 20
}

class PopularityDaySearchApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new PopularityDaySearchApi();
        }
        return this.#instance;
    }
    getPopularitySongDayList(){

        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/index/popularity/day",
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

class PopularityDayService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new PopularityDayService();
        }
        return this.#instance;
    }

    loadPopularityDayList(){
        const responseData = PopularityDaySearchApi.getInstance().getPopularitySongDayList();
        const SearchBody = document.querySelector(".content-table tbody");

        SearchBody.innerHTML = "";
 
        responseData.forEach((data, index) => {            
        SearchBody.innerHTML += `
        <tr class="content-list1">
            <th><input type="checkbox" class="delete-checkall">${data.songId}</th>
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