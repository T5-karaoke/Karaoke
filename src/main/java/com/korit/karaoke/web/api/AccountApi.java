package com.korit.karaoke.web.api;

import com.korit.karaoke.aop.annotation.ParamsAspect;
import com.korit.karaoke.aop.annotation.ValidAspect;
import com.korit.karaoke.entity.User.UserMst;
import com.korit.karaoke.security.PrincipalDetails;
import com.korit.karaoke.service.AccountService;
import com.korit.karaoke.web.dto.AccountReqDto;
import com.korit.karaoke.web.dto.CMRespDto;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@Slf4j
@Api(tags = {"Account Rest API Controller"})
@RestController
@RequestMapping("/api/account")
public class AccountApi {

    @Autowired
    private AccountService accountService;

    @ApiOperation(value = "회원가입", notes = "회원가입 요청 메소드")
    @ValidAspect
    @PostMapping("/register")
    public ResponseEntity<? extends CMRespDto<? extends UserMst>> register(@RequestBody @Valid UserMst userMst, BindingResult bindingResult) {

        accountService.duplicateUsername(userMst.getUsername());
        accountService.compareToPassword(userMst.getPassword(), userMst.getRepassword());

        UserMst user = accountService.registerUser(userMst);

        return ResponseEntity
                .created(URI.create("/api/account/user/" + user.getUserId()))
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Create a new User", user));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "userId", value = "사용자 식별 코드", required = true, dataType = "int"),
//            @ApiImplicitParam(name = "userId", value = "사용자 식별 코드", required = true, dataType = "int") // 파라미터 두개 이상일때
    })
    @ApiResponses({
            @ApiResponse(code = 400, message = "클라이언트가 잘못했음"),
            @ApiResponse(code = 401, message = "클라이언트가 잘못했음2")
    })
//    한개는 ApiResponse 로 사용
    @GetMapping("/user/{userId}")
    public ResponseEntity<? extends CMRespDto<? extends UserMst>> getUser(
//            @ApiParam(value = "사용자 식별 코드") // 파라미터 한개인 경우
            @PathVariable int userId) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", accountService.getUser(userId)));
    }

    @ApiOperation(value = "Get Principal", notes = "로그인된 사용자 정보 가져오기")
    @GetMapping("/principal")
    public ResponseEntity<CMRespDto<? extends PrincipalDetails>> getPrincipalDetails(@ApiParam(name = "principalDetails", hidden = true) @AuthenticationPrincipal PrincipalDetails principalDetails) {
        if(principalDetails != null) {
            principalDetails.getAuthorities().forEach(role -> {
                log.info("로그인된 사용자의 권한: {}", role.getAuthority());
            });
        }

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", principalDetails));
    }

    @ParamsAspect
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<CMRespDto<?>> removeUser(@PathVariable int userId) {
        accountService.removeUser(userId);
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @ParamsAspect
    @ValidAspect
    @PutMapping("/user/{userId}")
    public ResponseEntity<CMRespDto<?>> modifyUser(@PathVariable int userId, @Valid @RequestBody AccountReqDto accountReqDto, BindingResult bindingResult) {
        accountReqDto.setUserId(userId);
        accountService.modifyUser(accountReqDto);
        return  ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

}
