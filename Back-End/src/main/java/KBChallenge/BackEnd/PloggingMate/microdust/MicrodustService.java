package KBChallenge.BackEnd.PloggingMate.microdust;

import KBChallenge.BackEnd.PloggingMate.microdust.dto.MicrodustDto;
import KBChallenge.BackEnd.PloggingMate.util.GetApiService;
import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.URI;
import java.util.Objects;

@Service
public class MicrodustService implements GetApiService {

    private static final Logger logger = LogManager.getLogger(MicrodustService.class);
    private final RestTemplate restTemplate;
    private final Gson gson;

    @Value("${microdust.service.key}")
    private String serviceKey;

    @Value("${microdust.service.uri}")
    private String serviceUri;

    @Autowired
    public MicrodustService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.gson = new Gson();
    }

    public MicrodustDto getMicrodustInfo(String tmX, String tmY) throws Exception {
        String stationName = getNearbyMeasuringStation(tmX, tmY);
        URI callUri = getMicrodustInfoOpenUri(stationName);
        String responseBody = getApi(callUri);
        return convertToDto(responseBody);
    }

    private String getNearbyMeasuringStation(String tmX, String tmY) throws Exception{
        URI callUri = getNearbyMeasuringStationOpenUri(tmX, tmY);
        String responseBody = getApi(callUri);
        JSONArray jsonArray = extractJsonArray(responseBody);
        return jsonArray.getJSONObject(0).getString("stationName");
    }

    public String getApi(URI callUri) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        String responseBody = restTemplate.exchange(callUri, HttpMethod.GET, entity, String.class)
                .getBody();
        return responseBody;
    }

    private URI getNearbyMeasuringStationOpenUri(String tmX, String tmY) {
        String URI = serviceUri + "MsrstnInfoInqireSvc/getNearbyMsrstnList";
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(URI)
                .queryParam("serviceKey",serviceKey)
                .queryParam("returnType","json")
                .queryParam("tmX",tmX)
                .queryParam("tmY",tmY)
                .encode()
                .build(false);
        return builder.toUri();
    }

    private URI getMicrodustInfoOpenUri(String stationName) {
        String URI = serviceUri + "ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty";

        UriComponents builder = UriComponentsBuilder.fromHttpUrl(URI)
                .queryParam("serviceKey",serviceKey)
                .queryParam("returnType","json")
                .queryParam("numOfRows",1)
                .queryParam("pageNo",1)
                .queryParam("stationName",stationName)
                .queryParam("dataTerm","DAILY")
                .encode()
                .build(false);
        return builder.toUri();
    }

    private MicrodustDto convertToDto(String responseBody) throws IOException{
        JSONArray array = extractJsonArray(responseBody);

        MicrodustDto microdustDto = null;
        for (Object arr : array) {
            microdustDto = gson.fromJson(arr.toString(), (Type) MicrodustDto.class);
        }

        validateMicrodustDto(microdustDto);

        return microdustDto;
    }

    private JSONArray extractJsonArray(String responseBody) {
        JSONObject jsonObject = new JSONObject(responseBody); // getbody
        JSONObject getObject = jsonObject.getJSONObject("response")
                .getJSONObject("body");
        JSONArray array = (JSONArray) getObject.get("items");
        return array;
    }

    private void validateMicrodustDto(MicrodustDto microdustDto) throws IOException{
        if (Objects.isNull(microdustDto)) {
            throw new IOException("Faile to convert to MicrodustDTO");
        }
    }
}
