window.onload=()=>{
    
}



class FavoriteApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new FavoriteApi();
        }
        return this.#instance;
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

class FavoriteService{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new FavoriteService();
        }
        return this.#instance;
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

    addClickEventFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll(".favorite-buttons");
        const songIds = document.querySelectorAll(".song-id");
        const favoriteCounts = document.querySelectorAll(".favorite-count");

        favoriteButtons.forEach((button, index) => {
            button.onclick = () => {
                if(button.classList.contains("favorite-button")){
                    const favoriteCount = SearchApi.getInstance().setFavorite(songIds[index].value);
                    if(favoriteCount != -1){
                        favoriteCounts[index].textContent = favoriteCount;
                        button.classList.remove("favorite-button");
                        button.classList.add("disFavorite-button");
                        alert("애창곡 해제");
                    }
                    
                }else {
                    const favoriteCount = SearchApi.getInstance().setDisFavorite(songIds[index].value);
                    if(favoriteCount != -1){
                        favoriteCounts[index].textContent = favoriteCount;
                        button.classList.remove("disFavorite-button");
                        button.classList.add("favorite-button");
                        alert("애창곡 등록");
                       
                    }
                }
            }
        });
    }
}