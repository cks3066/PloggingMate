package KBChallenge.BackEnd.PloggingMate.account;

import KBChallenge.BackEnd.PloggingMate.account.dto.AccountAuthDto;
import KBChallenge.BackEnd.PloggingMate.account.dto.SignInReq;
import KBChallenge.BackEnd.PloggingMate.account.dto.SignInRes;
import KBChallenge.BackEnd.PloggingMate.account.entity.Account;
import KBChallenge.BackEnd.PloggingMate.configure.response.exception.CustomException;
import KBChallenge.BackEnd.PloggingMate.configure.response.exception.CustomExceptionStatus;
import KBChallenge.BackEnd.PloggingMate.configure.security.authentication.CustomUserDetails;
import KBChallenge.BackEnd.PloggingMate.configure.security.jwt.JwtTokenProvider;
import KBChallenge.BackEnd.PloggingMate.util.uploader.FirebaseFileService;
import KBChallenge.BackEnd.PloggingMate.util.location.NaverGeocode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static KBChallenge.BackEnd.PloggingMate.configure.entity.Status.VALID;


@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
@Slf4j // temp
public class AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final NaverGeocode naverGeocode;
    private final FirebaseFileService fileService;

    @Transactional
    public AccountAuthDto signUp(AccountAuthDto dto) {
        if (accountRepository.findByEmailAndStatus(dto.getEmail(), VALID).isPresent()) throw new CustomException(CustomExceptionStatus.DUPLICATED_EMAIL);
        if (accountRepository.findByNicknameAndStatus(dto.getNickname(), VALID).isPresent()) throw new CustomException(CustomExceptionStatus.DUPLICATED_NICKNAME);
        naverGeocode.getCoordinate(dto.getAddress());


        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        Account account = Account.createAccount(dto);
        Account save = accountRepository.save(account);
        dto.setAccountId(save.getAccountId());
        dto.setJwt(jwtTokenProvider.createToken(account.getEmail(),account.getRole()));
        return dto;
    }

    @Transactional
    public SignInRes signIn(SignInReq req) {
        Account account = accountRepository.findByEmailAndStatus(req.getEmail(), VALID)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.FAILED_TO_LOGIN));
        if(!passwordEncoder.matches(req.getPassword(),account.getPassword())){
            throw new CustomException(CustomExceptionStatus.FAILED_TO_LOGIN);
        }

        SignInRes res = SignInRes.builder()
                .accountId(account.getAccountId())
                .nickname(account.getNickname())
                .jwt(jwtTokenProvider.createToken(account.getEmail(), account.getRole()))
                .build();

        return res;
    }

    public AccountAuthDto getAuthAccount(CustomUserDetails customUserDetails) {
        Account account = customUserDetails.getAccount();
        return new AccountAuthDto(account);
    }

    public List<AccountAuthDto> getAccountRankingList() {
        List<AccountAuthDto> list = accountRepository.findAllByStatusOrderByParticipationCountDesc(VALID);
        return list;
    }

    @Transactional
    public String changeMyProfile(MultipartFile file, CustomUserDetails customUserDetails) {

        Account account = accountRepository.findById(customUserDetails.getAccount().getAccountId())
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.FAILED_TO_LOGIN));

        if (account.getProfileImage() != null)
            fileService.deleteFile(account.getProfileImage());

        String profileUri = fileService.upload(file);
        account.changeProfileImage(profileUri);

        return profileUri;
    }
}
