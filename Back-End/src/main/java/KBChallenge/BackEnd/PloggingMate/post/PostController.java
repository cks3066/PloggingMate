package KBChallenge.BackEnd.PloggingMate.post;

import KBChallenge.BackEnd.PloggingMate.configure.response.CommonResponse;
import KBChallenge.BackEnd.PloggingMate.configure.response.DataResponse;
import KBChallenge.BackEnd.PloggingMate.configure.response.ResponseService;
import KBChallenge.BackEnd.PloggingMate.configure.security.authentication.CustomUserDetails;
import KBChallenge.BackEnd.PloggingMate.post.dto.PostListRes;
import KBChallenge.BackEnd.PloggingMate.post.dto.CreatePostReq;
import KBChallenge.BackEnd.PloggingMate.util.ValidationExceptionProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/app")
public class PostController {

    private final ResponseService responseService;
    private final PostService postService;

    @GetMapping(value = "/posts")
    public DataResponse<List<List<PostListRes>>> getPostList(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        List<List<PostListRes>> postList = postService.getPostList(customUserDetails);
        return responseService.getDataResponse(postList);
    }

    @PostMapping(value = "/posts/{postId}/applications/accounts/auth")
    public CommonResponse chooseOrCancelApplications(@PathVariable(value = "postId") Long postId,
                                                     @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        postService.chooseOrCancelApplications(postId, customUserDetails);
        return responseService.getSuccessResponse();
    }

    @PostMapping(value = "/posts")
    public DataResponse<Long> createPost(@Valid @RequestBody CreatePostReq createPostReq, Errors errors,
                                                     @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (errors.hasErrors()) ValidationExceptionProvider.throwValidError(errors);
        Long postId = postService.createPost(createPostReq, customUserDetails);
        return responseService.getDataResponse(postId);
    }

}
