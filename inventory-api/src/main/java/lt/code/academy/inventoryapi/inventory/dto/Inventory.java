package lt.code.academy.inventoryapi.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.inventoryapi.employee.dto.Employee;
import lt.code.academy.inventoryapi.inventory.entity.InventoryEntity;
import lt.code.academy.inventoryapi.officer.dto.Officer;
import lt.code.academy.inventoryapi.room.dto.Room;

import java.math.BigDecimal;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Inventory {
    private UUID id;
    private String inventoryNumber;
    private String cardNumber;
    private String description;
    private String category;
    private Room room;
    private Officer officer;
    private Employee employee;
    private BigDecimal priceBefore;
    private BigDecimal priceNow;

    public static Inventory convert(InventoryEntity entity) {
        return new Inventory(
                entity.getId(),
                entity.getInventoryNumber(),
                entity.getCardNumber(),
                entity.getDescription(),
                entity.getCategory(),
                Room.convert(entity.getRoom()),
                Officer.convert(entity.getOfficer()),
                Employee.convert(entity.getEmployee()),
                entity.getPriceBefore(),
                entity.getPriceNow()
        );
    }
}
