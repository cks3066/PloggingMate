package KBChallenge.BackEnd.PloggingMate.post;

import KBChallenge.BackEnd.PloggingMate.account.entity.Account;
import KBChallenge.BackEnd.PloggingMate.configure.response.exception.CustomException;
import KBChallenge.BackEnd.PloggingMate.configure.response.exception.CustomExceptionStatus;
import KBChallenge.BackEnd.PloggingMate.configure.security.authentication.CustomUserDetails;
import KBChallenge.BackEnd.PloggingMate.park.entity.Park;
import KBChallenge.BackEnd.PloggingMate.park.entity.ParkRepository;
import KBChallenge.BackEnd.PloggingMate.post.dto.PostListRes;
import KBChallenge.BackEnd.PloggingMate.post.entity.AccountPostRelation;
import KBChallenge.BackEnd.PloggingMate.post.dto.CreatePostReq;
import KBChallenge.BackEnd.PloggingMate.post.entity.Post;
import KBChallenge.BackEnd.PloggingMate.post.repository.AccountPostRelationRepository;
import KBChallenge.BackEnd.PloggingMate.post.repository.PostRepository;
import KBChallenge.BackEnd.PloggingMate.util.location.NaverDirection5;
import KBChallenge.BackEnd.PloggingMate.util.location.NaverGeocode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static KBChallenge.BackEnd.PloggingMate.configure.entity.Status.*;

@Transactional
@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final NaverGeocode naverGeocode;
    private final NaverDirection5 naverDirection5;
    private final AccountPostRelationRepository accountPostRelationRepository;
    private final ParkRepository parkRepository;

    @Transactional(readOnly = true)
    public List<List<PostListRes>> getPostList(CustomUserDetails customUserDetails) {
        List<List<PostListRes>> ans = new ArrayList<>();
        List<PostListRes> list = postRepository.getNoAuthPostListAvailable();
        if(customUserDetails ==null) ans.add(list);
        else{
            Account account = customUserDetails.getAccount();
            String accountCoordinate = naverGeocode.getCoordinate(account.getAddress());
            for (PostListRes postListRes : list) {
                String parkCoordinate = naverGeocode.getCoordinate(postListRes.getAddress());
                postListRes.setDist(naverDirection5.getDistance(accountCoordinate, parkCoordinate));
            }
            Collections.sort(list);
            ans.add(list);
        }
        List<PostListRes> notAvailableList = postRepository.getNoAuthPostListNotAvailable();
        ans.add(notAvailableList);
        return ans;
    }

    public void chooseOrCancelApplications(Long postId, CustomUserDetails customUserDetails) {
        Post post = postRepository.findByStatusAndPostId(VALID, postId)
                .orElseThrow(() -> new CustomException(CustomExceptionStatus.POST_NOT_FOUND));
        Account account = customUserDetails.getAccount();
        Optional<AccountPostRelation> optional
                = accountPostRelationRepository.findByAccountAndPostAndStatus(account, post, VALID);
        if (optional.isPresent()){
            AccountPostRelation accountPostRelation = optional.get();
            accountPostRelation.toggleIsLike();
            post.changeApplyCount(accountPostRelation.getIsLike(), accountPostRelation);
        }
        else{
            AccountPostRelation accountPostRelation = new AccountPostRelation(account, post);
            accountPostRelationRepository.save(accountPostRelation);
        }
        if (post.getApplyCount() > post.getTotalApplyCount())
            throw new CustomException(CustomExceptionStatus.POST_OVER_APPLICANT);
    }

    public Long createPost(CreatePostReq createPostReq, CustomUserDetails customUserDetails) {
        Account account = customUserDetails.getAccount();
        Park park = parkRepository.findByParkIdAndStatus(createPostReq.getParkId(), VALID)
                .orElseThrow(() -> new CustomException(CustomExceptionStatus.POST_OVER_APPLICANT));
        Post post = new Post(createPostReq, account, park);
        Post save = postRepository.save(post);
        return save.getPostId();
    }
}
