class HeaderService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new HeaderService();
        }
        return this.#instance;
    }

    loadHeader() {
        const headerWrap = document.querySelector(".header-wrap");
        const principal = PrincipalApi.getInstance().getPrincipal();

        headerWrap.innerHTML = `
                <div class="util">
                <ul class="util-left">
                    <a href="#">
                        <li>노래방 플레이어 다운</li>
                    </a>
                    <a href="#">
                        <li>키싱 이용안내</li>
                    </a>
                    <a href="#">
                        <li>고객센터</li>
                    </a>
                </ul>
                <ul class="util-right">
                    ${principal == null
                        ? `
                        <a href="/account/login">
                            <li>로그인</li>
                        </a>
                        <a href="/account/register">
                            <li>회원가입</li>
                        </a>
                        `
                        : `
                        <a href="/mypage"><li>${principal.user.name}</li></a>
                        <a href="/logout"><li>로그아웃</li></a>
                        `
                    }
                </ul>
            </div>
            <div class="logo-search">
                <div class="logo">
                    <a href="/index">
                        <h1>
                            <img src="/static/images/kysing.png">
                        </h1>
                    </a>
                </div>
                <div class="search">
                    <input type="search" class="search-input">
                    <button type="button" class="search-button"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
            <div class="nav">
                <ul>
                    <li><a href="#">KY 차트</a>
                        <ul class="dropdown">
                            <li><a href="/chart">인기곡</a></li>
                        </ul>
                    </li>
                    <li><a href="#">PICK</a>
                        <ul class="dropdown">
                            <li><a href="#">KY-PICK</a></li>
                            <li><a href="#">USER-PICK</a></li>
                        </ul>
                    </li>
                    <li><a href="#">KY CONTENTS</a>
                        <ul class="dropdown">
                            <li><a href="#">KY CONTENTS</a></li>
                            <li><a href="#">노래방 차트쇼<br>
                            [우선 예약]</a></li>
                            <li><a href="#">K-MAGAZINE</a></li>
                            <li><a href="#">KY 스타어워즈</a></li>
                        </ul>
                    </li>
                    <li><a href="/search">반주곡 검색</a>
                        <ul class="dropdown">
                        <li><a href="/search">통합 검색</a></li>
                        <li><a href="/search/recent">최신곡</a></li>
                        <li><a href="/search/lts">LTS 최신곡</a></li>
                        <li><a href="">노래방책 검색</a></li>
                        </ul>
                    </li>
                    <li><a href="#">이용권 구매</a></li>
                    <li><a href="#">마이페이지</a>
                        <ul class="dropdown">
                            <li><a href="#">내 노래방</a></li>
                            <li><a href="#">웹 애창곡</a></li>
                            <li><a href="#">플레이리스트</a></li>
                            <li><a href="#">내 쿠폰함</a></li>
                            <li><a href="#">이용권 결제 내역</a></li>
                            <li><a href="/mypage">내 정보 관리</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        `;
    }
}


class ComponentEventTwo {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }
    addSearchButton() {
        const searchInput = document.querySelector(".search-input");
        const searchButton = document.querySelector(".search-button");
        
        searchButton.onclick = () => {
            searchObj.searchValue = searchInput.value;

            SongService.getInstance().loadSongList();

            location.href = `http://localhost:8000/search?searchValue=${serachInput.value}` ;
        }
        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                
                searchButton.click();
            }
        }
    }
}