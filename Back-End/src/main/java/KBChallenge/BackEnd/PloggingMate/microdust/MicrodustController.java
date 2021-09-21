package KBChallenge.BackEnd.PloggingMate.microdust;

import KBChallenge.BackEnd.PloggingMate.configure.response.DataResponse;
import KBChallenge.BackEnd.PloggingMate.configure.response.ResponseService;
import KBChallenge.BackEnd.PloggingMate.microdust.dto.MicrodustDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/app")
public class MicrodustController {

    private final ResponseService responseService;
    private final MicrodustService microdustService;

    @GetMapping(value = "/microdust")
    public DataResponse<MicrodustDto> checkMicrodustInfos(@RequestParam String tmX, @RequestParam String tmY) throws Exception {
        return responseService.getDataResponse(microdustService.getMicrodustInfo(tmX, tmY));
    }
}