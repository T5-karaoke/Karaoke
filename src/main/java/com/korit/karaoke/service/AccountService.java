package com.korit.karaoke.service;

import com.korit.karaoke.Repository.AccountRepository;
import com.korit.karaoke.entity.User.UserMst;
import com.korit.karaoke.exception.CustomValidationException;
import com.korit.karaoke.web.dto.AccountReqDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public UserMst registerUser(UserMst userMst) {
        userMst.setPassword(new BCryptPasswordEncoder().encode(userMst.getPassword()));
        accountRepository.saveUser(userMst);
        accountRepository.saveRole(userMst);
        return userMst;
    }

    public void duplicateUsername(String username) {
        UserMst user = accountRepository.findUserByUsername(username);
        if (user != null) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("username", "이미 존재하는 사용자이름입니다,");

            throw new CustomValidationException(errorMap);
        }
    }

    public void compareToPassword(String password, String repassword) {
        if (!password.equals(repassword)) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("repassword", "비밀번호가 일치하지 않습니다.");

            throw new CustomValidationException(errorMap);
        }
    }

    public UserMst getUser (int userId) {
        return accountRepository.findUserByUserId(userId);
    }

    public void removeUser(int userId) {
        accountRepository.deleteUser(userId);
    }

    public void modifyUser(AccountReqDto accountReqDto) {
        accountRepository.updateUserInformation(accountReqDto);
    }

}
