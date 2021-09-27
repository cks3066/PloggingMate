package KBChallenge.BackEnd.PloggingMate.park.entity;

import KBChallenge.BackEnd.PloggingMate.configure.entity.BaseTimeEntity;
import KBChallenge.BackEnd.PloggingMate.configure.entity.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static KBChallenge.BackEnd.PloggingMate.configure.entity.Status.*;

@Getter
@NoArgsConstructor
@Entity
public class Park extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long parkId;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(unique = true)
    private String name;

    @Column(name = "thumbnail_uri")
    private String thumbnailUri;

    private String address;

    private Double rating;

    public void upRating() {
        this.rating += 1;
    }

    protected Park(String name, String address, String thumbnailUri) {
        this.status = VALID;
        this.name = name;
        this.address = address;
        this.thumbnailUri = thumbnailUri;
        this.rating = 0.0;
    }

    public static Park of(String name, String address, String thumbnailUri) {
        return new Park(name, address, thumbnailUri);
    }
}
