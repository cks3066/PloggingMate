package KBChallenge.BackEnd.PloggingMate.account;

import KBChallenge.BackEnd.PloggingMate.account.dto.AccountAuthDto;
import KBChallenge.BackEnd.PloggingMate.account.entity.Account;
import KBChallenge.BackEnd.PloggingMate.configure.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByEmailAndStatus(String email, Status status);
    Optional<Account> findByNicknameAndStatus(String nickname, Status status);
    Optional<Account> findByAccountIdAndStatus(Long accountId, Status status);
    List<AccountAuthDto> findAllByStatusOrderByParticipationCountDesc(Status status);

}
