package KBChallenge.BackEnd.PloggingMate.post;

import KBChallenge.BackEnd.PloggingMate.account.AccountRepository;
import KBChallenge.BackEnd.PloggingMate.account.entity.Account;
import KBChallenge.BackEnd.PloggingMate.configure.response.exception.CustomException;
import KBChallenge.BackEnd.PloggingMate.configure.response.exception.CustomExceptionStatus;
import KBChallenge.BackEnd.PloggingMate.configure.security.authentication.CustomUserDetails;
import KBChallenge.BackEnd.PloggingMate.park.entity.Park;
import KBChallenge.BackEnd.PloggingMate.park.ParkRepository;
import KBChallenge.BackEnd.PloggingMate.post.dto.PostListRes;
import KBChallenge.BackEnd.PloggingMate.post.entity.AccountPostRelation;
import KBChallenge.BackEnd.PloggingMate.post.dto.CreatePostReq;
import KBChallenge.BackEnd.PloggingMate.post.entity.Post;
import KBChallenge.BackEnd.PloggingMate.post.repository.AccountPostRelationRepository;
import KBChallenge.BackEnd.PloggingMate.post.repository.PostRepository;
import KBChallenge.BackEnd.PloggingMate.util.location.NaverGeocode;
import KBChallenge.BackEnd.PloggingMate.util.uploader.FirebaseFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static KBChallenge.BackEnd.PloggingMate.configure.entity.Status.*;

@Transactional
@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final NaverGeocode naverGeocode;
    private final AccountPostRelationRepository accountPostRelationRepository;
    private final ParkRepository parkRepository;
    private final AccountRepository accountRepository;
    private final FirebaseFileService fileService;

    @Transactional(readOnly = true)
    public List<List<PostListRes>> getPostList(CustomUserDetails customUserDetails) {
        List<List<PostListRes>> ans = new ArrayList<>();
        List<PostListRes> list = postRepository.getNoAuthPostListAvailable();
        ans.add(list);
//        if(customUserDetails ==null) ans.add(list);
//        else{
//            Account account = customUserDetails.getAccount();
//            String accountCoordinate = naverGeocode.getCoordinate(account.getAddress());
//            for (PostListRes postListRes : list) {
//                String parkCoordinate = naverGeocode.getCoordinate(postListRes.getAddress());
//                postListRes.setDist(naverDirection5.getDistance(accountCoordinate, parkCoordinate));
//            }
//            Collections.sort(list);
//            ans.add(list);
//        }
        List<PostListRes> notAvailableList = postRepository.getNoAuthPostListNotAvailable();
        ans.add(notAvailableList);
        return ans;
    }

    public void chooseOrCancelApplications(Long postId, CustomUserDetails customUserDetails) {
        Post post = postRepository.findByStatusAndPostId(VALID, postId)
                .orElseThrow(() -> new CustomException(CustomExceptionStatus.POST_NOT_FOUND));
        String username = customUserDetails.getUsername();
        Account account = accountRepository.findByEmailAndStatus(username, VALID)
                .orElseThrow(() -> new CustomException(CustomExceptionStatus.ACCOUNT_NOT_FOUND));
        Optional<AccountPostRelation> optional
                = accountPostRelationRepository.findByAccountAndPostAndStatus(account, post, VALID);
        if (optional.isPresent()){
            AccountPostRelation accountPostRelation = optional.get();
            accountPostRelation.toggleIsLike();
            post.changeApplyCount(accountPostRelation.getIsLike());
            account.controlParticipationCount(accountPostRelation.getIsLike());
        }

        else{
            AccountPostRelation accountPostRelation = new AccountPostRelation(account, post);
            AccountPostRelation save = accountPostRelationRepository.save(accountPostRelation);
            post.getApplicants().add(save);
            post.changeApplyCount(true);
            account.controlParticipationCount(true);
        }
        if (post.getApplyCount() > post.getTotalApplyCount())
            throw new CustomException(CustomExceptionStatus.POST_OVER_APPLICANT);

    }

    public Long createPost(MultipartFile file, CreatePostReq createPostReq, CustomUserDetails customUserDetails) {
        Account account = customUserDetails.getAccount();
        createPostReq.setThumbnail(fileService.upload(file));
        if (createPostReq.getParkId() != null) {
            Park park = parkRepository.findByParkIdAndStatus(createPostReq.getParkId(), VALID)
                    .orElseThrow(() -> new CustomException(CustomExceptionStatus.PARK_NOT_FOUND));
            Post post = new Post(createPostReq, account, park);
            Post save = postRepository.save(post);
            return save.getPostId();
        }
        else {
            naverGeocode.getCoordinate(createPostReq.getAddress());
            Post post = new Post(createPostReq, account);
            Post save = postRepository.save(post);
            return save.getPostId();
        }
    }
}
