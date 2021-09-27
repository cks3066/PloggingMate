package KBChallenge.BackEnd.PloggingMate.util.uploader;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    String upload(MultipartFile multipartFile);

}
