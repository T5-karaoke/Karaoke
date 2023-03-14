window.onload = () => {
    HeaderService.getInstance().loadHeader();

    if(localStorage.getItem("searchValue") != null) {
        searchObj.searchValue = localStorage.removeItem("searchValue");
    }
    
    PopularityService.getInstance().loadPopularityList();

    ComponentEvent.getInstance().addClickEventSearchButton();
}



const searchObj = {
    page: 1,
    searchValue: null,
    count : 5
}

class PopularitySearchApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new PopularitySearchApi();
        }
        return this.#instance;
    }
    getMainPopularitySongList(){

        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/index/popularity",
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


class PopularityService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new PopularityService();
        }
        return this.#instance;
    }

    loadPopularityList(){
        const responseData = PopularitySearchApi.getInstance().getMainPopularitySongList();
        const SearchBody = document.querySelector(".main-chart-left");

        SearchBody.innerHTML = "";

        responseData.forEach((data, index) => {
            SearchBody.innerHTML = `
                    <h3>일간 차트</h3>
                    <ul class="main-chart-up">
                        <li>
                            <input type="checkbox" class="pick-checkall">
                        </li>
                        <li>순위</li>
                        <li>곡번호</li>
                        <li>곡명</li>
                        <li>아티스트</li>
                        <li>담기</li>
                    </ul>
                    <ul class="main-chart-down first">
                        <li>
                    <input type="checkbox" class="pick-check">
                        </li>
                    <li>${responseData[0].songId}</li>
                    <li>${responseData[0].songCode}</li>
                    <li>${responseData[0].songName}</li>
                    <li>${responseData[0].artist}</li>
                    <li>
                        <ul class="chart-icon">
                            <li>
                                <a href="#">
                                    <img src="../static/images/chart_mic.png">
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="../static/images/plus.png">
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                    <ul class="main-chart-down second">
                <li>
                    <input type="checkbox" class="pick-check">
                    </li>
                    <li>${responseData[1].songId}</li>
                    <li>${responseData[1].songCode}</li>
                    <li>${responseData[1].songName}</li>
                    <li>${responseData[1].artist}</li>
                    <li>
                        <ul class="chart-icon">
                            <li>
                                <a href="#">
                                    <img src="../static/images/chart_mic.png">
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="../static/images/plus.png">
                                </a>
                            </li>
                        </ul>
                    </li>
               </ul>
                <ul class="main-chart-down">
                <li>
                    <input type="checkbox" class="pick-check">
                    </li>
                    <li>${responseData[2].songId}</li>
                    <li>${responseData[2].songCode}</li>
                    <li>${responseData[2].songName}</li>
                    <li>${responseData[2].artist}</li>
                    <li>
                        <ul class="chart-icon">
                            <li>
                                <a href="#">
                                    <img src="../static/images/chart_mic.png">
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="../static/images/plus.png">
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>    
                <ul class="main-chart-down">
                <li>
                    <input type="checkbox" class="pick-check">
                    </li>
                    <li>${responseData[3].songId}</li>
                    <li>${responseData[3].songCode}</li>
                    <li>${responseData[3].songName}</li>
                    <li>${responseData[3].artist}</li>
                    <li>
                        <ul class="chart-icon">
                            <li>
                                <a href="#">
                                    <img src="../static/images/chart_mic.png">
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="../static/images/plus.png">
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>    
                <ul class="main-chart-down">
                <li>
                    <input type="checkbox" class="pick-check">
                    </li>
                    <li>${responseData[4].songId}</li>
                    <li>${responseData[4].songCode}</li>
                    <li>${responseData[4].songName}</li>
                    <li>${responseData[4].artist}</li>
                    <li>
                        <ul class="chart-icon">
                            <li>
                                <a href="#">
                                    <img src="../static/images/chart_mic.png">
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="../static/images/plus.png">
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>    
                <ul class="main-chart-down">
                <li>
                    <input type="checkbox" class="pick-check">
                    </li>
                    <li>${responseData[5].songId}</li>
                    <li>${responseData[5].songCode}</li>
                    <li>${responseData[5].songName}</li>
                    <li>${responseData[5].artist}</li>
                    <li>
                        <ul class="chart-icon">
                            <li>
                                <a href="#">
                                    <img src="../static/images/chart_mic.png">
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="../static/images/plus.png">
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>    
                <ul class="main-chart-down">
                <li>
                    <input type="checkbox" class="pick-check">
                    </li>
                    <li>${responseData[6].songId}</li>
                    <li>${responseData[6].songCode}</li>
                    <li>${responseData[6].songName}</li>
                    <li>${responseData[6].artist}</li>
                    <li>
                        <ul class="chart-icon">
                            <li>
                                <a href="#">
                                    <img src="../static/images/chart_mic.png">
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="../static/images/plus.png">
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>    
                <ul class="main-chart-down">
                <li>
                    <input type="checkbox" class="pick-check">
                    </li>
                    <li>${responseData[7].songId}</li>
                    <li>${responseData[7].songCode}</li>
                    <li>${responseData[7].songName}</li>
                    <li>${responseData[7].artist}</li>
                    <li>
                        <ul class="chart-icon">
                            <li>
                                <a href="#">
                                    <img src="../static/images/chart_mic.png">
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="../static/images/plus.png">
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>    
                <ul class="main-chart-down">
                <li>
                    <input type="checkbox" class="pick-check">
                    </li>
                    <li>${responseData[8].songId}</li>
                    <li>${responseData[8].songCode}</li>
                    <li>${responseData[8].songName}</li>
                    <li>${responseData[8].artist}</li>
                    <li>
                        <ul class="chart-icon">
                            <li>
                                <a href="#">
                                    <img src="../static/images/chart_mic.png">
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="../static/images/plus.png">
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="main-chart-down last">
                <li>
                    <input type="checkbox" class="pick-check">
                    </li>
                    <li>${responseData[9].songId}</li>
                    <li>${responseData[9].songCode}</li>
                    <li>${responseData[9].songName}</li>
                    <li>${responseData[9].artist}</li>
                    <li>
                        <ul class="chart-icon">
                            <li>
                                <a href="#">
                                    <img src="../static/images/chart_mic.png">
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="../static/images/plus.png">
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul> 
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

            searchObj.searchValue = localStorage.setItem("searchValue", searchInput.value);
            location.href = `http://localhost:8000/search?searchValue=${searchInput.value}` ;

        }
        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                
                searchButton.click();
            }
        }

    }
    
}
