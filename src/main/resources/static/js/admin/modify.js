window.onload = () => {
    userObj = PrincipalApi.getInstance().getPrincipal();
    HeaderService.getInstance().loadHeader();
    ModifyName.getInstance().changeModifyName();
    ComponentEvent.getInstance().addClickEventDeleteButton();
}

let userObj = {
    userId: "",
    username: "",
    password: "",
    name: "",
    phoneNumber: "",
    email: ""
}

class UserIdDelete {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserIdDelete();
        }
        return this.#instance;
    }

    removeUserId() {
        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/account/user/${userObj.user.userId}`,
            dataType: "json",
            success: response => {
                alert("계정 삭제 완료");
                location.href = '/logout';
            },
            error: error => {
                console.log(error);
            }
        });
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

    addClickEventDeleteButton() {
        const admModListDelete = document.querySelector(".adm-mod-list-delete");

        admModListDelete.onclick = () => {
            if(confirm("정말로 계정을 삭제하시겠습니까?")) {
                UserIdDelete.getInstance().removeUserId();
            } else {
                location.reload();
            }
        }
    }
}