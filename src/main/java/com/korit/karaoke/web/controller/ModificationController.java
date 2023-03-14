package com.korit.karaoke.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ModificationController {

    @GetMapping({"/mypage"})
    public String mypage() {
        return "admin/admin_modification";
    }

    @GetMapping({"/mypage/edit_information"})
    public String editInformation() {
        return "admin/admin_edit_information";
    }

    @GetMapping({"/mypage/pwd_confirm"})
    public String pwdConfirm() {
        return "admin/admin_pwd_confirm";
    }

    @GetMapping({"/mypage/pwd_change"})
    public String pwdChange() {
        return "admin/admin_pwd_change";
    }

}
