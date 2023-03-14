window.onload = () => {
    SongModifyService.getInstance().setSongCode();
    SongModifyService.getInstance().loadCategories();
    SongModifyService.getInstance().loadSongData();

    ComponentEvent.getInstance().addClickEventModifyButton();
    ComponentEvent.getInstance().addClickEventCancelButton();
}

const songObj = {
    songCode: "",
    songName: "",
    artist: "",
    composer: "",
    lyricist: "",
    publicationDate: "",
    category: ""
}

class SongModifyApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SongModifyApi();
        }
        return this.#instance;
    }

    getSongCode() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/admin/song/${songObj.songCode}`,
            dataType: "json",
            success: response => {
                responseData = response.data;
                console.log(responseData);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }


    modifySong() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "put",
            url: `http://localhost:8000/api/admin/song/${songObj.songCode}`,
            contentType: "application/json",
            data: JSON.stringify(songObj),
            dataType: "json",
            success: response => {
                successFlag = true;
            },
            error: error => {
                console.log(error);
                SongModifyService.getInstance().setErrors(error.responseJSON.data);
                
            }
        });

        return successFlag;
    }

    getCategories() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/categories",
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }
}

class SongModifyService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SongModifyService();
        }
        return this.#instance;
    }

    setSongCode() {
        const URLSearch = new URLSearchParams(location.search);
        songObj.songCode = URLSearch.get("songCode");
    }

    loadSongData() {
        const responseData = SongModifyApi.getInstance().getSongCode();

        if(responseData == null) {
            alert("해당 노래코드는 등록되지 않은 코드입니다.");
            history.back();
            return;
        }

        const modifyInputs = document.querySelectorAll(".modify-input");
        modifyInputs[0].value = responseData.songCode;
        modifyInputs[1].value = responseData.songName;
        modifyInputs[2].value = responseData.artist;
        modifyInputs[3].value = responseData.composer;
        modifyInputs[4].value = responseData.lyricist;
        modifyInputs[5].value = responseData.publicationDate;
        modifyInputs[6].value = responseData.category;
    }

    setSongObjValues() {
        const modifyInputs = document.querySelectorAll(".modify-input");

        songObj.songCode = modifyInputs[0].value;
        songObj.songName = modifyInputs[1].value;
        songObj.artist = modifyInputs[2].value;
        songObj.composer = modifyInputs[3].value;
        songObj.lyricist = modifyInputs[4].value;
        songObj.publicationDate = modifyInputs[5].value;
        songObj.category = modifyInputs[6].value;
    }

    loadCategories() {
        const responseData = SongModifyApi.getInstance().getCategories();

        const categorySelect = document.querySelector(".category-select");
        categorySelect.innerHTML = `<option value="">장르를 선택하세요.</option>`;

        responseData.forEach(data => {
            categorySelect.innerHTML += `
                <option value="${data.category}">${data.category}</option>
            `;
        });
    }

    setErrors(errors) {
        const errorMessages = document.querySelectorAll(".error-message");
        this.clearErrors();

        Object.keys(errors).forEach(key => {
            if(key == "songCode") {
                errorMessages[0].innerHTML = errors[key];
            }else if(key == "songName") {
                errorMessages[1].innerHTML = errors[key];
            }else if(key == "category") {
                errorMessages[6].innerHTML = errors[key];
            }
        })
    }

    clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(error => {
            error.innerHTML = "";
        })
    }
}

class ComponentEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }

    addClickEventModifyButton() {
        const modifyButton = document.querySelector(".modify-button");

        modifyButton.onclick = () => {
            
            if(confirm("반주곡을 수정하시겠습니까?")) {
                SongModifyService.getInstance().setSongObjValues();
                const successFlag = SongModifyApi.getInstance().modifySong();
                
                if(!successFlag) {
                    return;
                }

                alert("반주곡 수정이 완료되었습니다.");
                location.href='../song/song_search.html'
            }
        }
    }

    addClickEventCancelButton() {
        const CancelButton = document.querySelector(".return-button");

        CancelButton.onclick = () => {
            if(confirm("반주곡을 수정을 취소하시겠습니까?")) {
                location.href='../song/song_search.html'
            }
        }
    }
}