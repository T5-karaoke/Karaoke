window.onload = () => {
    userObj = PrincipalApi.getInstance().getPrincipal();
    HeaderService.getInstance().loadHeader();
    ModifyInformationService.getInstance().changeModifyInformation();
    ComponentEvent.getInstance().informationClickModificationEvent();
}

let userObj = {
    name: "",
    phoneNumber: "",
    email: "",
    updateDate: ""
}

class ModifyInformationApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModifyInformationApi();
        }
        return this.#instance;
    }

    modifyInformation() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "put",
            url: `http://localhost:8000/api/account/user/${userObj.user.userId}`,
            contentType: "application/json",
            data: JSON.stringify(userObj),
            dataType: "json",
            success: response => {
                successFlag = true;
                alert("내 정보 수정 완료!!!");
                location.href = "/index";
            },
            error: error => {
                console.log(error);
            }            
        });

        return successFlag;
    }    
} 

class ModifyInformationService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModifyInformationService();
        }
        return this.#instance;
    }

    changeModifyInformation() {
        const informationContainer = document.querySelector(".information-container");

        console.log(informationContainer.innerHTML);

        informationContainer.innerHTML = `
            <div class="register-content">
                <div class="register-group">
                    <label for="register-name">성함</label>
                    <div class="input-group">
                        <input type="text" class="register-inputs" value="${userObj.user.name}">
                        <div class="register-error"></div>
                    </div>
                </div>
                <div class="register-group">
                    <label for="register-tel">연락처</label>
                    <div class="input-group">
                        <input type="text" class="register-inputs" value="${userObj.user.phonenumber}">
                        <div class="register-error"></div>
                    </div>
                </div>
                <div class="register-group">
                    <label for="register-email">이메일</label>
                    <div class="input-group">
                        <input type="text" class="register-inputs" value="${userObj.user.email}">
                        <div class="register-error"></div>
                    </div>
                </div>

            </div>
            <button type="button" class="modify-submit">프로필 업데이트</button>
        `;
    }

    setUserObjValues() {
        const registerInputs = document.querySelectorAll(".register-inputs");

        userObj.user.name = registerInputs[0].value;
        userObj.user.phonenumber = registerInputs[1].value;
        userObj.user.email = registerInputs[2].value;
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

    informationClickModificationEvent() {
        const modifySubmit = document.querySelector(".modify-submit");

        modifySubmit.onclick = () => {
            ModifyInformationService.getInstance().setUserObjValues();
            const successFlag = ModifyInformationApi.getInstance().modifyInformation();

            if(!successFlag) {
                return;
            } else {
                location.href = "/index";
            }

        }
    }
}