window.onload = () => {
    PrincipalApi.getInstance().getPrincipal();
    HeaderService.getInstance().loadHeader();
    ModifyPasswordService.getInstance().changeModifyPassword();
}

let userObj = {
    userId: "",
    username: "",
    password: "",
    name: "",
    phoneNumber: "",
    email: ""
}

class PasswordModificationApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new PasswordModificationApi();
        }
        return this.#instance;
    }

    modifyPassword() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "put",
            url: `http://localhost:8000/api/account/user/${userObj.userId}`,
            contentType: "application/json",
            data: JSON.stringify(userObj),
            dataType: "json",
            success: response => {
                successFlag = true;
            },
            error: error => {
                console.log(error);
            }            
        });

        return successFlag;
    }
}

class ModifyPasswordService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModifyPasswordService();
        }
        return this.#instance;
    }

    changeModifyPassword() {
        const passwordContainer = document.querySelector(".password-container");

        console.log(passwordContainer.innerHTML);

        passwordContainer.innerHTML = `
                <div class="register-content">
                <div class="register-group">
                    <label for="register-newpassword">새로운 비밀번호</label>
                    <div class="input-group">
                        <input type="password" id="register-newpassword" class="register-inputs">
                        <div class="register-error"></div>
                    </div>
                </div>
                <div class="register-group">
                    <label for="register-newpassword">새로운 비밀번호 확인</label>
                    <div class="input-group">
                        <input type="password" id="register-newpassword" class="register-inputs">
                        <div class="register-error"></div>
                    </div>
                </div>

            </div>
            <button type="button" class="modify-submit">비밀번호 변경 완료</button>
        `;
    }
}