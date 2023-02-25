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
                    <a href="/index.html">
                        <h1>
                            <img src="../static/images/kysing.png">
                        </h1>
                    </a>
                </div>
                <div class="search">
                    <input type="text" class="search-input">
                    <button class="search-button"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
            <div class="nav">
                <ul>
                    <li><a href="#">KY 차트</a>
                        <ul class="dropdown">
                            <li><a href="#">Sub-1</a></li>
                            <li><a href="#">Sub-2</a></li>
                            <li><a href="#">Sub-3</a></li>
                        </ul>
                    </li>
                    <li><a href="#">PICK</a>
                        <ul class="dropdown">
                            <li><a href="#">Sub-1</a></li>
                            <li><a href="#">Sub-2</a></li>
                            <li><a href="#">Sub-3</a></li>
                        </ul>
                    </li>
                    <li><a href="#">KY CONTENTS</a>
                        <ul class="dropdown">
                            <li><a href="#">Sub-1</a></li>
                            <li><a href="#">Sub-2</a></li>
                            <li><a href="#">Sub-3</a></li>
                        </ul>
                    </li>
                    <li><a href="#">반주곡 검색</a>
                        <ul class="dropdown">
                            <li><a href="#">Sub-1</a></li>
                            <li><a href="#">Sub-2</a></li>
                            <li><a href="#">Sub-3</a></li>
                        </ul>
                    </li>
                    <li><a href="#">이용권 구매</a></li>
                    <li><a href="#">마이페이지</a>
                        <ul class="dropdown">
                            <li><a href="#">Sub-1</a></li>
                            <li><a href="#">Sub-2</a></li>
                            <li><a href="#">Sub-3</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        `;
    }
}