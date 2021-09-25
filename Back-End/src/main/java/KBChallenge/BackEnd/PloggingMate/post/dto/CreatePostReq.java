package KBChallenge.BackEnd.PloggingMate.post.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CreatePostReq {

    @NotBlank
    private String contents;

    private LocalDateTime reservedAt;

    private Long parkId;

    @NotNull
    private Integer totalApplyCount;

    private String name;

    private String address;

}
