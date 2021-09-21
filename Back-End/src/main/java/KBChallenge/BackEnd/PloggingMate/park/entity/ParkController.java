package KBChallenge.BackEnd.PloggingMate.park.entity;

import KBChallenge.BackEnd.PloggingMate.configure.response.ResponseService;
import KBChallenge.BackEnd.PloggingMate.park.entity.dto.CreateParkReq;
import KBChallenge.BackEnd.PloggingMate.util.ValidationExceptionProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/app")
public class ParkController {

    private final ParkService parkService;
    private final ResponseService responseService;

    @PostMapping("/park")
    public Object createPark(@RequestPart("file") MultipartFile file, @RequestPart("content") @Valid CreateParkReq createParkReq, Errors errors) {
        if (errors.hasErrors()) ValidationExceptionProvider.throwValidError(errors);

        return responseService.getDataResponse(parkService.createPark(createParkReq, file));
    }

}
