package com.korit.karaoke.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserMst {
    private int userId;
    private String userName;
    private String password;
    private String name;
    private String phoneNumber;
    private String email;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    private List<RoleDtl> roleDtl;
}
