package KBChallenge.BackEnd.PloggingMate.post.dto;

import KBChallenge.BackEnd.PloggingMate.post.entity.AccountPostRelation;
import KBChallenge.BackEnd.PloggingMate.post.entity.Post;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class PostListRes implements Comparable<PostListRes>{

    private Long postId;

    private String contents;

    private LocalDateTime reservedAt;

    private String information;

    private String address;

    private Integer applyCount;

    private Long parkId;

    private String parkName;

    private String thumbnail;

    private Long creatorAccountId;

    private String creatorNickname;

    private List<ApplicantRes> accounts = new ArrayList<>();

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double dist;

    @Override
    public int compareTo(PostListRes other) {
        return Double.compare(this.dist, other.dist);
    }

    public PostListRes(Post post){
        this.postId = post.getPostId();
        this.contents = post.getContents();
        this.reservedAt = post.getReservedAt();
        this.address = post.getAddress();
        this.applyCount = post.getApplyCount();
        this.information = post.getInformation();
        if (post.getPark() != null) {
            this.parkId = post.getPark().getParkId();
            this.parkName = post.getPark().getName();
        }
        this.thumbnail = post.getThumbnail();
        this.accounts = post.getApplicants().stream().filter(AccountPostRelation::getIsLike).map(ApplicantRes::new).collect(Collectors.toList());
        this.creatorAccountId = post.getAccount().getAccountId();
        this.creatorNickname = post.getAccount().getNickname();
    }

}
