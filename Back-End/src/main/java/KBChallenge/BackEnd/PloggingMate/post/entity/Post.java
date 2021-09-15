package KBChallenge.BackEnd.PloggingMate.post.entity;

import KBChallenge.BackEnd.PloggingMate.configure.entity.BaseTimeEntity;
import KBChallenge.BackEnd.PloggingMate.configure.entity.Status;
import KBChallenge.BackEnd.PloggingMate.park.entity.Park;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Post extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String contents;

    private LocalDateTime reservedAt;

    private String address;

    private Integer applyCount;

    @ManyToOne(fetch = LAZY, cascade = ALL)
    @JoinColumn(name = "parkId")
    private Park park;

}
