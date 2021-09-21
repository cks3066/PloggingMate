package KBChallenge.BackEnd.PloggingMate.post.dto;

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

    private String address;

    private Integer applyCount;

    private Long parkId;

    private String parkName;

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
        this.parkId = post.getPark().getParkId();
        this.parkName = post.getPark().getName();
        accounts = post.getApplicants().stream().map(ApplicantRes::new).collect(Collectors.toList());
    }

}
