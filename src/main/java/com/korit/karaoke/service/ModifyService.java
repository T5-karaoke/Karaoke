package com.korit.karaoke.service;

import com.korit.karaoke.Repository.AccountRepository;
import com.korit.karaoke.entity.User.UserMst;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ModifyService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    public boolean checkPassword(UserMst user, String checkPassword) {
        String realPassword = user.getPassword(); // AuthenticationPrincipal
        return passwordEncoder.matches(checkPassword, realPassword);
    }

}
