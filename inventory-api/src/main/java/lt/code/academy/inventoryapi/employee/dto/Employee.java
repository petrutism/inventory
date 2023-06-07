package lt.code.academy.inventoryapi.employee.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.inventoryapi.employee.entity.EmployeeEntity;
import lt.code.academy.inventoryapi.room.dto.Room;

import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    private UUID id;
    private String name;
    private String surname;
    private Room room;
    public static Employee convert(EmployeeEntity entity) {
        Room room = Room.convert(entity.getRoom());
        return new Employee(
                entity.getId(),
                entity.getName(),
                entity.getSurname(),
                room
        );
    }
}
