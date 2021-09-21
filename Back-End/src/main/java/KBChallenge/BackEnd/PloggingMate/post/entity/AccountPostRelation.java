package KBChallenge.BackEnd.PloggingMate.post.entity;

import KBChallenge.BackEnd.PloggingMate.account.entity.Account;
import KBChallenge.BackEnd.PloggingMate.configure.entity.BaseTimeEntity;
import KBChallenge.BackEnd.PloggingMate.configure.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static KBChallenge.BackEnd.PloggingMate.configure.entity.Status.*;
import static javax.persistence.EnumType.*;
import static javax.persistence.FetchType.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AccountPostRelation extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long relationId;

    @Enumerated(STRING)
    private Status status;

    private Boolean isLike;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "accountId")
    private Account account;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "postId")
    private Post post;

    public void toggleIsLike() {
        this.isLike = !this.isLike;
    }


    public AccountPostRelation(Account account, Post post){
        this.status = VALID;
        this.isLike = true;
        this.account = account;
        this.post = post;
    }
}
