package com.korit.karaoke.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AccountReqDto {

    @ApiModelProperty(hidden = true)
    private int userId;
    @ApiModelProperty(hidden = true)
    private String username;
    @ApiModelProperty(hidden = true)
    private String password;
    private String name;
    private String phonenumber;
    private String email;
    @ApiModelProperty(hidden = true)
    private String provider;
    @ApiModelProperty(hidden = true)
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

}
