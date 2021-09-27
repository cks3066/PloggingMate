package KBChallenge.BackEnd.PloggingMate.park;

import KBChallenge.BackEnd.PloggingMate.configure.entity.Status;
import KBChallenge.BackEnd.PloggingMate.park.entity.Park;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParkRepository extends JpaRepository<Park, Long> {

    Optional<Park> findByName(String name);

    Optional<Park> findByParkIdAndStatus(Long parkId, Status status);
}
