package KBChallenge.BackEnd.PloggingMate.account.dto;

import KBChallenge.BackEnd.PloggingMate.account.entity.Account;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import static com.fasterxml.jackson.annotation.JsonProperty.Access;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountAuthDto {

    @JsonProperty(access = Access.READ_ONLY)
    private Long accountId;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Length(min=3, max = 20)
    @Pattern(regexp = "^[가-힣a-zA-Z0-9_-]{3,20}$")
    private String nickname;

    @NotBlank
    @JsonProperty(access = Access.WRITE_ONLY)
    @Length(min=8, max= 50)
    private String password;

    private int participationCount;

    private String profileImage;

    @NotBlank
    @Pattern(regexp = "^[가-힣a-zA-Z0-9\\s_-]*$")
    private String address;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty(access = Access.READ_ONLY)
    private String jwt;

    public AccountAuthDto(Account account) {

        this.accountId = account.getAccountId();
        this.email = account.getEmail();
        this.nickname = account.getNickname();
        this.address = account.getAddress();
        this.participationCount = account.getParticipationCount();
        this.profileImage = account.getProfileImage();
    }

}
