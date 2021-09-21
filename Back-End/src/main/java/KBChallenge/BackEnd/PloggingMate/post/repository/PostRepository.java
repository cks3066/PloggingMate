package KBChallenge.BackEnd.PloggingMate.post.repository;

import KBChallenge.BackEnd.PloggingMate.configure.entity.Status;
import KBChallenge.BackEnd.PloggingMate.post.dto.PostListRes;
import KBChallenge.BackEnd.PloggingMate.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(
            "SELECT p FROM Post p " +
                    "INNER JOIN p.park park " +
                    "LEFT JOIN FETCH p.applicants r " +
                    "LEFT JOIN FETCH r.account a " +
                    "WHERE (p.status = 'VALID' AND p.reservedAt > CURRENT_DATE() )"+
                    "ORDER BY p.reservedAt DESC"
    )
    List<PostListRes> getNoAuthPostListAvailable();

    @Query(
            "SELECT p FROM Post p " +
                    "INNER JOIN p.park park " +
                    "LEFT JOIN FETCH p.applicants r " +
                    "LEFT JOIN FETCH r.account a " +
                    "WHERE (p.status = 'VALID' AND p.reservedAt <= CURRENT_DATE() )"+
                    "ORDER BY p.reservedAt DESC"
    )
    List<PostListRes> getNoAuthPostListNotAvailable();

    Optional<Post> findByStatusAndPostId(Status status, Long postId);

}