window.onload = () => {
    userObj = PrincipalApi.getInstance().getPrincipal();
    HeaderService.getInstance().loadHeader();
    ModifyPasswordConfirmService.getInstance().confirmPassword();
    ComponentEvent.getInstance().passwordClickConfirmEvent();
}

let userObj = null;

class ModifyPasswordConfirmApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModifyPasswordConfirmApi();
        }
        return this.#instance;
    }

    comfirmPassword() {

        const checkPassword = document.querySelector(".register-inputs").value;
        
        if(!checkPassword || checkPassword.trim() === ""){
            alert("비밀번호를 입력하세요.");
        } else{
            $.ajax({
                async: false,
                type: 'post',
                url: `http://localhost:8000/api/mypage/pwd_confirm`,
                contentType: "application/json",
                data: JSON.stringify({'checkPassword': checkPassword}),
                dataType: "json",
                success: response => {
                    if(response) {
                        location.href = "/mypage/pwd_change";
                    } else {
                        alert("비밀번호가 맞지 않습니다.");
                        location.reload();
                    }
                },
                error: error => {
                    console.log(error);
                }
            })
        }
    }
}

class ModifyPasswordConfirmService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModifyPasswordConfirmService();
        }
        return this.#instance;
    }

    confirmPassword() {
        const passwordContainer = document.querySelector(".password-container");

        console.log(passwordContainer.innerHTML);

        passwordContainer.innerHTML = `
            <div class="register-content">
                <div class="register-group">
                    <label for="register-password">현재 비밀번호</label>
                    <div class="input-group">
                        <input type="password" id="register-password" class="register-inputs">
                        <div class="register-error"></div>
                    </div>
                </div>
            </div>
            <button type="button" class="modify-submit">비밀번호 확인</button>
        `;
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

    passwordClickConfirmEvent() {
        const modifySubmit = document.querySelector(".modify-submit");

        modifySubmit.onclick = () => {
            ModifyPasswordConfirmApi.getInstance().comfirmPassword();
        }
    }
}