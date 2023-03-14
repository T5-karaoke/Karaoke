window.onload = () => {
    SongService.getInstance().loadSongList();
    SongService.getInstance().loadCategories();
    
    ComponentEvent.getInstance().addClickEventSearchButton();
    ComponentEvent.getInstance().addClickEventDeleteButton();
    ComponentEvent.getInstance().addClickEventDeleteCheckAll();
}

let searchObj = {
    page : 1,
    category : "",
    searchValue : "",
    order : "songId",
    limit : "Y",
    count : 20
}

class SongSearchApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SongSearchApi();
        }
        return this.#instance;
    }

    getSongList(searchObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/songs",
            data: searchObj,
            dataType: "json",
            success: response => {
                console.log(response);
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return returnData;
    }

    getSongTotalCount(searchObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/songs/totalcount",
            data: {
                "category" : searchObj.category,
                "searchValue" : searchObj.searchValue
            },
            dataType: "json",
            success: response => {
                console.log(response);
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return returnData;
    }

    getCategories() {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/categories",
            dataType: "json",
            success: response => {
                console.log(response);
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return returnData;
    }

    deleteSongs(deleteArray) {
        let returnFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: "http://localhost:8000/api/admin/songs",
            contentType: "application/json",
            data: JSON.stringify(
                {
                    userIds: deleteArray
                }
            ),
            dataType: "json",
            success: response => {
                returnFlag = true;
            },
            error: error => {
                console.log(error);
            }
        })

        return returnFlag;
    }
}

class SongService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SongService();
        }
        return this.#instance;
    }

    loadSongList() {
        const responseData = SongSearchApi.getInstance().getSongList(searchObj);
        const checkAll = document.querySelector(".delete-checkall");
        checkAll.checked = false;

        const songListBody = document.querySelector(".content-table tbody");
        songListBody.innerHTML = "";

        responseData.forEach((data, index) => {
            songListBody.innerHTML += `
                <tr>
                    <td><input type="checkbox" class="delete-checkbox"></td>
                    <td class="song-id">${data.songId}</td>
                    <td>${data.songCode}</td>
                    <td>${data.songName}</td>
                    <td>${data.artist}</td>
                    <td>${data.composer}</td>
                    <td>${data.lyricist}</td>
                    <td>${data.publicationDate}</td>
                    <td>${data.category}</td>
                    <td><a href="../song/song_modification.html?songCode=${data.songCode}"><i class="fa-solid fa-square-pen"></i></td>
                </tr>
            `;
        });

        this.loadSearchNumberList();
        ComponentEvent.getInstance().addClickEventDeleteCheckbox();
    }

    loadCategories() {
        const responseData = SongSearchApi.getInstance().getCategories();

        const categorySelect = document.querySelector(".category-select");
        categorySelect.innerHTML = `<option value="">전체조회</option>`;

        responseData.forEach(data => {
            categorySelect.innerHTML += `
                <option value="${data.category}">${data.category}</option>
            `;
        });
    }

    loadSearchNumberList() {
        const pageController = document.querySelector(".page-controller");

        const totalCount = SongSearchApi.getInstance().getSongTotalCount(searchObj);
        const maxPageNumber = totalCount % searchObj.count == 0 
                            ? Math.floor(totalCount / searchObj.count) 
                            : Math.floor(totalCount / searchObj.count) + 1;

        pageController.innerHTML = `
            <a href="javascript:void(0)" class="prev-button disabled">이전</a>
            <ul class="page-numbers">
            </ul>
            <a href="javascript:void(0)" class="next-button disabled">다음</a>
        `;

        if(searchObj.page != 1) {
            const prevButton = pageController.querySelector(".prev-button");
            prevButton.classList.remove("disabled");

            prevButton.onclick = () => {
                searchObj.page--;
                this.loadSongList();
            }
        }

        if(searchObj.page != maxPageNumber) {
            const nextButton = pageController.querySelector(".next-button");
            nextButton.classList.remove("disabled");

            nextButton.onclick = () => {
                searchObj.page++;
                this.loadSongList();
            }
        }

        const startIndex = searchObj.page % 5 == 0 
                        ? searchObj.page - 4 
                        : searchObj.page - (searchObj.page % 5) + 1;
        const endIndex = startIndex + 4 <= maxPageNumber
                        ? startIndex + 4 : maxPageNumber;
        const pageNumbers = document.querySelector(".page-numbers");

        for(let i = startIndex; i <= endIndex; i++) {
            pageNumbers.innerHTML += `
                <a href="javascript:void(0)"class="page-button ${i == searchObj.page ? "disabled" : ""}"><li>${i}</li></a>
            `;
        }

        const pageButtons = document.querySelectorAll(".page-button");
        pageButtons.forEach(button => {

            const pageNumber = button.textContent;
            if(pageNumber != searchObj.page) {
                button.onclick = () => {
                    searchObj.page = pageNumber;
                    this.loadSongList();
                }
            }
        });
    }

    removeSongs(deleteArray) {
        let successFlag = SongSearchApi.getInstance().deleteSongs(deleteArray);
        if(successFlag) {
            searchObj.page = 1;
            this.loadSongList();
        }
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

    addClickEventSearchButton() {
        const categorySelect = document.querySelector(".category-select");
        const searchInput = document.querySelector(".main-search-input");
        const searchButton = document.querySelector(".main-search-button");

        searchButton.onclick = () => {
            searchObj.category = categorySelect.value;
            searchObj.searchValue = searchInput.value;
            searchObj.page = 1;
            SongService.getInstance().loadSongList();
        }

        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                searchButton.click();
            }
        }
    }

    addClickEventDeleteButton() {
        const deleteButton = document.querySelector(".delete-button");
        deleteButton.onclick = () => {
            if(confirm("정말로 삭제하시겠습니까?")) {
                const deleteArray = new Array();
    
                const deleteCheckboxs = document.querySelectorAll(".delete-checkbox");

                deleteCheckboxs.forEach((deleteCheckbox, index) => {
                    if(deleteCheckbox.checked) {
                        const songIds = document.querySelectorAll(".song-id");
                        deleteArray.push(songIds[index].textContent);
                    }
                });
    
                SongService.getInstance().removeSongs(deleteArray);
            }
        }
    }

    addClickEventDeleteCheckAll() {
        const checkAll = document.querySelector(".delete-checkall");
        checkAll.onclick = () => {
            const deleteCheckboxs = document.querySelectorAll(".delete-checkbox");
            deleteCheckboxs.forEach(deleteCheckbox => {
                deleteCheckbox.checked = checkAll.checked;
            });
        }
    }

    addClickEventDeleteCheckbox() {
        const deleteCheckboxs = document.querySelectorAll(".delete-checkbox");
        const checkAll = document.querySelector(".delete-checkall");

        deleteCheckboxs.forEach(deleteCheckbox => {
            deleteCheckbox.onclick = () => {
                const deleteCheckedCheckboxs = document.querySelectorAll(".delete-checkbox:checked");

                if(deleteCheckedCheckboxs.length == deleteCheckboxs.length) {
                    checkAll.checked = true;
                }else {
                    checkAll.checked = false;
                }
            }
        });
    }
}