package lt.code.academy.inventoryapi.room.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.inventoryapi.room.dto.Room;

import java.util.UUID;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "rooms")
public class RoomEntity {
    @Id
    @GeneratedValue
    private UUID id;
    private String roomNumber;
    private String city;

    public static RoomEntity convert(Room room) {
        return new RoomEntity(
                room.getId(),
                room.getRoomNumber(),
                room.getCity()
        );
    }
}
