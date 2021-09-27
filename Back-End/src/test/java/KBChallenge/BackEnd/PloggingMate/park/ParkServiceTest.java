package KBChallenge.BackEnd.PloggingMate.park;

import KBChallenge.BackEnd.PloggingMate.configure.response.exception.CustomException;
import KBChallenge.BackEnd.PloggingMate.configure.response.exception.CustomExceptionStatus;
import KBChallenge.BackEnd.PloggingMate.park.entity.Park;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class ParkServiceTest {

    @Autowired
    private ParkRepository parkRepository;

    @DisplayName("공원 정보를 등록한다.")
    @Test
    void testCreatePark() {
        // given
        String name = "제102호 어린이공원";
        String address = "경기도 용인시 수지구 죽전동 1484번지 일원";
        String thumbnail = "http://localhost/image_folder/102childrenPark.jpeg";
        Park savingPark = Park.of(name, address, thumbnail);

        // when
        parkRepository.save(savingPark);


        Park findPark = parkRepository.findByName(name)
                .orElseThrow(() -> new CustomException(CustomExceptionStatus.PARK_NOT_FOUND));

        // then
        assertAll(
                () -> assertThat(savingPark.getParkId()).isEqualTo(1),
                () -> assertThat(savingPark.getName()).isEqualTo(findPark.getName()),
                () -> assertThat(savingPark.getAddress()).isEqualTo(findPark.getAddress())
        );
    }


}