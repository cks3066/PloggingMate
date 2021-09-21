package KBChallenge.BackEnd.PloggingMate.park.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateParkRes {

    private Long parkId;

    private String name;

    private String address;

    private String thumbnailUri;

}