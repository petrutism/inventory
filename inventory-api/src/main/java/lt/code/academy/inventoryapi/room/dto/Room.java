package lt.code.academy.inventoryapi.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.inventoryapi.room.entity.RoomEntity;

import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    private UUID id;
    private String roomNumber;
    private String city;
    public static Room convert(RoomEntity entity) {
        return new Room(
                entity.getId(),
                entity.getRoomNumber(),
                entity.getCity()
        );
    }
}
