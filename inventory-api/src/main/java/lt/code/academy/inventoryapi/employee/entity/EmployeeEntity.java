package lt.code.academy.inventoryapi.employee.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.inventoryapi.employee.dto.Employee;
import lt.code.academy.inventoryapi.room.dto.Room;
import lt.code.academy.inventoryapi.room.entity.RoomEntity;

import java.util.UUID;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "employees")
public class EmployeeEntity {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String surname;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id")
    private RoomEntity room;
    public static EmployeeEntity convert (Employee employee){
        RoomEntity roomEntity = RoomEntity.convert(employee.getRoom());
        return new EmployeeEntity(
                employee.getId(),
                employee.getName(),
                employee.getSurname(),
                roomEntity
        );
    }
}
