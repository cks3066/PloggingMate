package KBChallenge.BackEnd.PloggingMate.post.repository;

import KBChallenge.BackEnd.PloggingMate.account.entity.Account;
import KBChallenge.BackEnd.PloggingMate.configure.entity.Status;
import KBChallenge.BackEnd.PloggingMate.post.entity.AccountPostRelation;
import KBChallenge.BackEnd.PloggingMate.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountPostRelationRepository extends JpaRepository<AccountPostRelation, Long> {
    Optional<AccountPostRelation> findByAccountAndPostAndStatus(Account account, Post post, Status status);
}
