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
public class RoleMstDto {
    private int roleId;

    private String roleName;

    private LocalDate createDate;
    private LocalDate updateDate;
}
