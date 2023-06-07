package lt.code.academy.inventoryapi.officer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.inventoryapi.officer.entity.OfficerEntity;
import lt.code.academy.inventoryapi.room.dto.Room;
import lt.code.academy.inventoryapi.room.entity.RoomEntity;

import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Officer {
    private UUID id;
    private String name;
    private String surname;
    private Room room;

    public static Officer convert(OfficerEntity entity) {
        Room room = Room.convert(entity.getRoom());
        return new Officer(
                entity.getId(),
                entity.getName(),
                entity.getSurname(),
                room
        );
    }
}
