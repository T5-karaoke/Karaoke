window.onload = () => {
    LikeService.getInstance().loadSearchSongs();
    ComponentEvent.getInstance(). addClickEventLikeButtons();
    ComponentEvent.getInstance(). addClickEventFavoriteButtons();


}







class LikeApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new LikeApi();
        }
        return this.#instance;
    }

    setLike(songId) {
        let likeCount = -1;
        
        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/song/${songId}/like`,
            dataType: "json",
            success: response => {
                likeCount = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
 
        return likeCount;
    }
 
    setDisLike(songId) {
        let likeCount = -1;
        
        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/song/${songId}/like`,
            dataType: "json",
            success: response => {
                likeCount = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
 
        return likeCount;
    }

    setFavorite(songId) {
        let likeCount = -1;

        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/song/${songId}/favorite`,
            dataType: "json",
            success: response => {
                likeCount = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return likeCount;
    }

    setDisFavorite(songId) {
        let likeCount = -1;

        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/song/${songId}/favorite`,
            dataType: "json",
            success: response => {
                likeCount = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return likeCount;
    }



}




class LikeService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new LikeService();
        }
        return this.#instance;
    }

    loadSearchSongs() {
        const responseData = SearchApi.getInstance().searchSong();
        const chartDown = document.querySelector(".playlist-chart-down");
        const principal = PrincipalApi.getInstance().getPrincipal();

        const _likeButtons = document.querySelectorAll(".like-buttons");
        const likeButtonsLength = _likeButtons == null ? 0 : _likeButtons.length;

        const _favoriteButtons = document.querySelectorAll(".favorite-buttons");
        const favoriteButtonsLength = _favoriteButtons == null ? 0 : _favoriteButtons.length;

        console.log(responseData);

        responseData.forEach((data, index) => {
            chartDown.innerHTML += `
                <input type="hidden" class="song-id" value="${data.songId}">
                <li class="pcd1">
                    <input type="checkbox" class="pick-check">
                </li>
                <li class="pcd2">2</li>
                <li class="pcd3">28707</li>
                <li class="song-name">사건의 지평선</li>
                <li class="pcd5">윤하</li>
                <li class="pcd6">윤하,JEWNO</li>
                <li class="pcd7">윤하</li>
                <li class="pcd8">2022.05.01</li>
                <li class="like-buttons">
                    
                </li>
                <li class="favorite-buttons">
                    <a href="#">
                        <img src="../static/images/chart_mic.png">
                    </a>
                </li>
                <li class="pcd11">
                    <a href="#">
                        <img src="../static/images/plus.png">
                    </a>
                </li>
            `;

            const likeButtons = document.querySelectorAll(".like-buttons");
            const favoriteButtons = document.querySelectorAll(".favorite-buttons");
            if(principal == null) {
                

                likeButtons[likeButtonsLength + index].innerHTML += `
                    <button type="button"> <i class="fa-regular fa-thumbs-up" class="like-button" disable></i></button>
                `;
                favoriteButtons[favoriteButtonsLength + index].innerHTML += `
                    <button type="button"> <span class="favorite-button"><img src="../static/images/chart_mic.png" disable></span></button>
                `;
            }else {
               
                
                if(data.likeId != 0){
                    likeButtons[likeButtonsLength + index].innerHTML += `
                        <button type="button"> <i class="fa-solid fa-thumbs-up" class="like-buttons dislike-button"></i></button>
                    `;
                }else {
                    likeButtons[likeButtonsLength + index].innerHTML += `
                        <button type="button"> <i class="fa-regular fa-thumbs-up" class="like-buttons like-button"></i></button>
                        
                    `;
                }

                if(data.favoriteId != 0){
                    favoriteButtons[favoriteButtonsLength + index].innerHTML += `
                        <button type="button"> <span class="favorite-buttons disFavorite-button"><img src="../static/images/chart_mic.png"></span> </button>
                    `;
                    alert("애창곡 해제");
                }else {
                    favoriteButtons[favoriteButtonsLength + index].innerHTML += `
                        <button type="button"> <span class="favorite-buttons favorite-button"><img src="../static/images/chart_mic.png"></span> </button>
                        
                    `;
                    alert("애창곡 등록");
                }

                
                ComponentEvent.getInstance().addClickEventLikeButtons();
                ComponentEvent.getInstance().addClickEventFavoriteButtons();
            }


        
        
        
        });
           

        
    }
}   

    
    


class ComponentEvent{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }

    addClickEventLikeButtons() {
        const likeButtons = document.querySelectorAll(".like-buttons");
        const songIds = document.querySelectorAll(".song-id");
        
        likeButtons.forEach((button, index) => {
            button.onclick = () => {
                if(button.classList.contains("like-button")){
                    const likeCount = SearchApi.getInstance().setLike(songIds[index].value);
                    if(likeCount != -1){
                        
                        button.classList.remove("like-button");
                        button.classList.add("dislike-button");
                        
                    }
                    
                }else {
                    const likeCount = SearchApi.getInstance().setDisLike(songIds[index].value);
                    if(likeCount != -1){
                       
                        button.classList.remove("dislike-button");
                        button.classList.add("like-button");
                        
                    }
                }
            }
        });
    }

    addClickEventFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll(".favorite-buttons");
        const songIds = document.querySelectorAll(".song-id");
        
        favoriteButtons.forEach((button, index) => {
            button.onclick = () => {
                if(button.classList.contains("favorite-button")){
                    const favoriteCount = SearchApi.getInstance().setFavorite(songIds[index].value);
                    if(favoriteCount != -1){
                        
                        button.classList.remove("favorite-button");
                        button.classList.add("disFavorite-button");
                        
                    }
                    
                }else {
                    const favoriteCount = SearchApi.getInstance().setDisFavorite(songIds[index].value);
                    if(favoriteCount != -1){
                        
                        button.classList.remove("disFavorite-button");
                        button.classList.add("favorite-button");
                        
                       
                    }
                }
            }
        });
    }
}




