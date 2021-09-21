package KBChallenge.BackEnd.PloggingMate.util;

import java.net.URI;

public interface GetApiService {
    Object getApi(URI callUri) throws Exception;
}
