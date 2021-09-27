package KBChallenge.BackEnd.PloggingMate.account;

import KBChallenge.BackEnd.PloggingMate.account.dto.AccountAuthDto;
import KBChallenge.BackEnd.PloggingMate.account.dto.SignInReq;
import KBChallenge.BackEnd.PloggingMate.account.dto.SignInRes;
import KBChallenge.BackEnd.PloggingMate.configure.response.DataResponse;
import KBChallenge.BackEnd.PloggingMate.configure.response.ResponseService;
import KBChallenge.BackEnd.PloggingMate.configure.security.authentication.CustomUserDetails;
import KBChallenge.BackEnd.PloggingMate.util.ValidationExceptionProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/app")
public class AccountController {

    private final ResponseService responseService;
    private final AccountService accountService;

    @PostMapping(value = "/sign-up")
    public DataResponse<AccountAuthDto> signUp(@RequestBody @Valid AccountAuthDto dto, Errors errors){
        if (errors.hasErrors()) ValidationExceptionProvider.throwValidError(errors);
        return responseService.getDataResponse(accountService.signUp(dto));
    }

    @PostMapping(value = "/sign-in")
    public DataResponse<SignInRes> signIn(@RequestBody @Valid SignInReq req, Errors errors) {
        if (errors.hasErrors()) ValidationExceptionProvider.throwValidError(errors);
        return responseService.getDataResponse(accountService.signIn(req));
    }

    @GetMapping(value = "/accounts/auth")
    public DataResponse<AccountAuthDto> getAuthAccount(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return responseService.getDataResponse(accountService.getAuthAccount(customUserDetails));
    }

    @GetMapping(value = "/accounts/rankings")
    public DataResponse<List<AccountAuthDto>> getAccountRankingList() {
        List<AccountAuthDto> list = accountService.getAccountRankingList();
        return responseService.getDataResponse(list);
    }

    @PatchMapping(value = "/accounts/profile")
    public DataResponse<?> changeMyProfile(@RequestPart("file") MultipartFile file, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return responseService.getDataResponse(accountService.changeMyProfile(file, customUserDetails));
    }

}
