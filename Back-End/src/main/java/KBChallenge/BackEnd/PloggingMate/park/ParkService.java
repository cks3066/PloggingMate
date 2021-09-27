package KBChallenge.BackEnd.PloggingMate.park;

import KBChallenge.BackEnd.PloggingMate.configure.response.exception.CustomException;
import KBChallenge.BackEnd.PloggingMate.configure.response.exception.CustomExceptionStatus;
import KBChallenge.BackEnd.PloggingMate.park.dto.CreateParkRes;
import KBChallenge.BackEnd.PloggingMate.park.dto.CreateParkReq;
import KBChallenge.BackEnd.PloggingMate.park.entity.Park;
import KBChallenge.BackEnd.PloggingMate.util.uploader.FirebaseFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ParkService {

    private final ParkRepository parkRepository;
    private final FirebaseFileService fileService;

    @Transactional
    public CreateParkRes createPark(CreateParkReq req, MultipartFile file) {

        if (parkRepository.findByName(req.getName()).isPresent()) {
            throw new CustomException(CustomExceptionStatus.DUPLICATED_PARK);
        }

        String thumnailUri = fileService.upload(file);

        Park park = Park.of(req.getName(), req.getAddress(), thumnailUri);

        Park save = parkRepository.save(park);

        CreateParkRes res = CreateParkRes.builder()
                .parkId(save.getParkId())
                .name(save.getName())
                .address(save.getAddress())
                .thumbnailUri(save.getThumbnailUri())
                .build();

        return res;
    }
}
