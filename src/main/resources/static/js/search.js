window.onload = () => {

    SearchService.getInstance().loadSearchSongs();

  
    
   

}

let maxPage = 0;

const searchObj = {
    page: 1,
    searchValue: null,
    categories: new Array(),
    count: 10
}

class SearchApi{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SearchApi();
        }
        return this.#instance;
    }



    setLike(songId) {
       let likeCount = -1;
       
       $.ajax({
           async: false,
           type: "post",
           url: `http://localhost:8000/song/${songId}/like`,
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
           url: `http://localhost:8000/song/${songId}/like`,
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

class SearchService{
     static #instance = null;
       static getInstance() {
           if(this.#instance == null) {
               this.#instance = new SearchService();
           }
           return this.#instance;
       }


    loadSearchSongs(){
        const responseData = SearchApi.getInstance().searchSong();
        const contentFlex = document.querySelector(".playlist-chart");
        // const principal = PrincipalApi.getInstance().getPrincipal();

        const _pcd9 = document.querySelectorAll(".pcd9");
        const pcd9Length = _pcd9 == null ? 0 : _pcd9.length;

        console.log(responseData)

        responseData.array.forEach((data, index) => {
            contentFlex.innerHTML += `
                <div class="info-container">
                
                    <div class="like-info"><i class="fa-regular fa-thumbs-up"></i> <span class="like-count">${data.likeCount != null ? data.likeCount : 0}</span></div>
                </div>

                <ul class="playlist-chart-down">
                        <li class="pcd1">
                            <input type="checkbox" class="pick-check">
                        </li>
                        <li class="pcd2">1</li>
                        <li class="pcd3">28707</li>
                        <li class="pcd4">????????? ?????????</li>
                        <li class="pcd5">??????</li>
                        <li class="pcd6">??????,JEWNO</li>
                        <li class="pcd7">??????</li>
                        <li class="pcd8">2022.05.01</li>
                        <li class="pcd9">
                           

                        </li>
                        <li class="pcd10">
                            <a href="#">
                                <img src="../static/images/chart_mic.png">
                            </a>
                        </li>
                        <li class="pcd11">
                            <a href="#">
                                <img src="../static/images/plus.png">
                            </a>
                        </li>
                    </ul>
            `;
            const pcd9 = document.querySelectorAll(".pcd9");
            if(principal == null){

                pcd9[pcd9Length + index].innerHTML += `
                <button type="button" class="like-button" <a href="#"><img src="../static/images/lts-2.png"></a>>??????</button>
            `;
                
                
            }else{
                if(data.likeId != 0){
                    pcd9[pcd9Length + index].innerHTML += `
                    <button type="button" class="like-buttons" <a href="#"><img src="../static/images/lts-2.png"></a>>?????????</button>
                    
                    
                    `;
                }else {
                    pcd9[pcd9Length + index].innerHTML += `
                    <button type="button" class="like-buttons" <a href="#">
                    <img src="../static/images/lts-2.png">
                    </a>>?????????</button>
                    `;
                }

                ComponentEvent.getInstance().addClickEventLikeButtons();

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
        const bookIds = document.querySelectorAll(".song-id");
        const likeCounts = document.querySelectorAll(".like-count");

        likeButtons.forEach((button, index) => {
            button.onclick = () => {
                if(button.classList.contains("like-button")){
                    const likeCount = SearchApi.getInstance().setLike(bookIds[index].value);
                    if(likeCount != -1){
                        likeCounts[index].textContent = likeCount;
                        button.classList.remove("like-button");
                        button.classList.add("dislike-button");
                        button.textContent = "?????????";
                    }
                    
                }else {
                    const likeCount = SearchApi.getInstance().setDisLike(bookIds[index].value);
                    if(likeCount != -1){
                        likeCounts[index].textContent = likeCount;
                        button.classList.remove("dislike-button");
                        button.classList.add("like-button");
                        button.textContent = "??????";
                    }
                }
            }
        });
    }
}