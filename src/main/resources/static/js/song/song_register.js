window.onload = () => {
    SongRegisterService.getInstance().loadCategories();

    ComponentEvent.getInstance().addClickEventRegisterButton();
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

class SongRegisterApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SongRegisterApi();
        }
        return this.#instance;
    }

    registerSong() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "post",
            url: "http://localhost:8000/api/admin/song",
            contentType: "application/json",
            data: JSON.stringify(songObj),
            dataType: "json",
            success: response => {
                successFlag = true;
            },
            error: error => {
                console.log(error);
                SongRegisterService.getInstance().setErrors(error.responseJSON.data);
                
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

class SongRegisterService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SongRegisterService();
        }
        return this.#instance;
    }

    setSongObjValues() {
        const registerInputs = document.querySelectorAll(".register-input");

        songObj.songCode = registerInputs[0].value;
        songObj.songName = registerInputs[1].value;
        songObj.artist = registerInputs[2].value;
        songObj.composer = registerInputs[3].value;
        songObj.lyricist = registerInputs[4].value;
        songObj.publicationDate = registerInputs[5].value;
        songObj.category = registerInputs[6].value;
    }

    loadCategories() {
        const responseData = SongRegisterApi.getInstance().getCategories();

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
        console.log("1");

        Object.keys(errors).forEach(key => {
            if(key == "songCode") {
                errorMessages[0].innerHTML = errors[key];
                console.log("2");
            }else if(key == "songName") {
                errorMessages[1].innerHTML = errors[key];
                console.log("3");
            }else if(key == "category") {
                errorMessages[6].innerHTML = errors[key];
                console.log("4");
            }
        })
    }

    clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(error => {
            error.innerHTML = "";
            console.log("5");
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

    addClickEventRegisterButton() {
        const registerButton = document.querySelector(".register-button");

        registerButton.onclick = () => {
            
            if(confirm("반주곡을 등록하시겠습니까?")) {
                SongRegisterService.getInstance().setSongObjValues();
                const successFlag = SongRegisterApi.getInstance().registerSong();

                if(!successFlag) {
                    return;
                }

                alert("반주곡 등록이 완료되었습니다.");
                location.href='../song/song_search.html'

                
            }

            
        }
    }

    addClickEventCancelButton() {
        const CancelButton = document.querySelector(".return-button");

        CancelButton.onclick = () => {
            if(confirm("반주곡을 등록을 취소하시겠습니까?")) {
                location.href='../song/song_search.html'
            }
        }
    }
}