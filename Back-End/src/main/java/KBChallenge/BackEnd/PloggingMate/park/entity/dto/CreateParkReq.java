package KBChallenge.BackEnd.PloggingMate.park.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateParkReq {

    @NotBlank
    private String name;

    @NotBlank
    private String address;

}
