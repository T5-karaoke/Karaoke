class ModifyName {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModifyName();
        }
        return this.#instance;
    }     
    
    changeModifyName() {
        const admModWrap = document.querySelector(".adm-mod-wrap");
        const principal = PrincipalApi.getInstance().getPrincipal();

        admModWrap.innerHTML = `
            <h3>${principal.user.name}</h3>
            <ul class="adm-mod-list">
                <a href="/mypage/edit_information"><li>내 정보 수정</li></a>
                <a href="/mypage/pwd_confirm"><li>비밀번호 변경</li></a>
                <a href="/logout"><li>로그아웃</li></a>
                <a href="javascript:void(0)" class="adm-mod-list-delete"><li>계정 삭제</li></a>
            </ul>
        `;
    }
}