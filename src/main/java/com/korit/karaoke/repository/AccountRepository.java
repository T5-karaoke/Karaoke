package com.korit.karaoke.repository;

import com.korit.karaoke.entity.UserMst;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {

    public UserMst findUserByUserId(int userId);
    public UserMst findUserByUsername(String userName);
    public int saveUser(UserMst user);
    public int saveRole(UserMst user);
    public int setUserProvider(UserMst user);

}
