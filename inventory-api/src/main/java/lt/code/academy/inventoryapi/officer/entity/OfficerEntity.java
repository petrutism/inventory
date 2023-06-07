package lt.code.academy.inventoryapi.officer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.inventoryapi.officer.dto.Officer;
import lt.code.academy.inventoryapi.room.entity.RoomEntity;

import java.util.UUID;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "officers")
public class OfficerEntity {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String surname;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id")
    private RoomEntity room;

    public static OfficerEntity convert(Officer officer) {
        RoomEntity roomEntity = RoomEntity.convert(officer.getRoom());
        return new OfficerEntity(
                officer.getId(),
                officer.getName(),
                officer.getSurname(),
                roomEntity
        );
    }
}
