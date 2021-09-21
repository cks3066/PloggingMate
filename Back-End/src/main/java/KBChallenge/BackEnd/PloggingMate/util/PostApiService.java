package KBChallenge.BackEnd.PloggingMate.util;

import java.net.URI;

public interface PostApiService {
    Object postApi(URI callUri) throws Exception;
}
