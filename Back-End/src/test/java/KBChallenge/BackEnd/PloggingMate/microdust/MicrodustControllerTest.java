package KBChallenge.BackEnd.PloggingMate.microdust;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class MicrodustControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @DisplayName("미세먼지 정보 조회 API")
    @Test
    public void testGetMicrodustInfoApi() throws Exception {

        MultiValueMap<String, String> userParam = new LinkedMultiValueMap<>();

        userParam.add("tmX","212260.30360800");
        userParam.add("tmY","455168.10145573");

        mockMvc.perform(get("/app/v1/microdust")
                        .params(userParam)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
                        .andDo(print());
    }

    @DisplayName("TM좌표값이 Null이면 예외를 발생시킨다.")
    @Test
    public void testGetMicrodustInfoApiIfTmParamsNoPresent() throws Exception {

        mockMvc.perform(get("/app/v1/microdust")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                        .andExpect(status().isBadRequest())
                        .andDo(print());
    }

}