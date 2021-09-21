package KBChallenge.BackEnd.PloggingMate.microdust;

import KBChallenge.BackEnd.PloggingMate.configure.RestTemplateConfig;
import KBChallenge.BackEnd.PloggingMate.microdust.dto.MicrodustDto;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.Date;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class MicrodustServiceTest {

    @MockBean
    RestTemplateConfig restTemplateConfig;

    @Autowired
    MicrodustService microdustService;

    @DisplayName("미세먼지 정보를 받아오는데 성공한다.")
    @Test
    public void testGetMicrodustInfo() throws Exception {
        // given
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:00");
        String expectDateTime = simpleDateFormat.format(new Date());
        String tmX = "212260.30360800";
        String tmY = "455168.10145573";

        // when
        MicrodustDto response = microdustService.getMicrodustInfo(tmX,tmY);

        // then
        Assertions.assertThat(response.getDataTime()).isEqualTo(expectDateTime);
    }

}