package KBChallenge.BackEnd.PloggingMate.post.dto;

import KBChallenge.BackEnd.PloggingMate.account.entity.Account;
import KBChallenge.BackEnd.PloggingMate.post.entity.AccountPostRelation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ApplicantRes {

    private Long accountId;

    private String accountName;

    public ApplicantRes(AccountPostRelation relation) {
        this.accountId = relation.getAccount().getAccountId();
        this.accountName = relation.getAccount().getNickname();
    }
}
