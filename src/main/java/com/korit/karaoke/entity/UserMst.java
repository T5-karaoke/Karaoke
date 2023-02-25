package com.korit.karaoke.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserMst {

//    @NotBlank
    private int userId;
    @Pattern(regexp = "^[a-z0-9]{4,14}$", message = "아이디는 영어 소문자와 숫자만 사용하여 4~14자리여야 합니다.")
    private String username;
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$", message = "비밀번호는 8~16자리수여야 합니다. 영문 대소문자, 숫자, 특수문자를 1개 이상 포함해야 합니다.")
    private String password;
    @NotBlank
    private String repassword;
    @NotBlank
    private String name;
    @NotBlank
    private String phonenumber;
    @NotBlank
    private String email;
    private String provider;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private List<RoleDtl> roleDtl;

}
