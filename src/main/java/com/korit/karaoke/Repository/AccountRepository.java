package com.korit.karaoke.Repository;

import com.korit.karaoke.entity.User.UserMst;
import com.korit.karaoke.web.dto.AccountReqDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {

    public UserMst findUserByUserId(int userId);
    public UserMst findUserByUsername(String userName);
    public UserMst confirmUserByPassword(String password);
    public int saveUser(UserMst user);
    public int saveRole(UserMst user);
    public int updateUserInformation(AccountReqDto accountReqDto);
    public int setUserProvider(UserMst user);
    public int deleteUser(int userId);

}
