package KBChallenge.BackEnd.PloggingMate.post.entity;

import KBChallenge.BackEnd.PloggingMate.account.entity.Account;
import KBChallenge.BackEnd.PloggingMate.configure.entity.BaseTimeEntity;
import KBChallenge.BackEnd.PloggingMate.configure.entity.Status;
import KBChallenge.BackEnd.PloggingMate.park.entity.Park;
import KBChallenge.BackEnd.PloggingMate.post.dto.CreatePostReq;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static KBChallenge.BackEnd.PloggingMate.configure.entity.Status.*;
import static javax.persistence.FetchType.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Post extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String contents;

    private LocalDateTime reservedAt;

    private String address;

    private Integer applyCount;

    private Integer totalApplyCount;

    public void changeApplyCount(Boolean isLike, AccountPostRelation accountPostRelation) {
        if (isLike) {
            this.applyCount++;
        }
        else {
            this.applyCount--;
        }
    }

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "parkId")
    private Park park;

    @OneToMany(mappedBy = "post")
    private List<AccountPostRelation> applicants = new ArrayList<>();

    public Post(CreatePostReq createPostReq, Account account, Park park){
        this.status = VALID;
        this.contents = createPostReq.getContents();
        this.reservedAt = createPostReq.getReservedAt();
        this.address = park.getAddress();
        this.applyCount = 0;
        this.totalApplyCount = createPostReq.getTotalApplyCount();
        this.park = park;
    }

}
