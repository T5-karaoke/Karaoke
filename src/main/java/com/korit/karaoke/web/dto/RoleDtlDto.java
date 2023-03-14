package com.korit.karaoke.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoleDtlDto {
    private int roleDtlId;

    private int userId;
    private int roleId;

    private RoleMstDto roleMstDto;

    private LocalDate createDate;
    private LocalDate updateDate;
}
