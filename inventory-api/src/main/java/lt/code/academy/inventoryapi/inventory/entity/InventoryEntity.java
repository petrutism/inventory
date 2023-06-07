package lt.code.academy.inventoryapi.inventory.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.inventoryapi.employee.entity.EmployeeEntity;
import lt.code.academy.inventoryapi.inventory.dto.Inventory;
import lt.code.academy.inventoryapi.officer.entity.OfficerEntity;
import lt.code.academy.inventoryapi.room.entity.RoomEntity;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "inventories")
public class InventoryEntity {
    @Id
    @GeneratedValue
    private UUID id;
    private String inventoryNumber;
    private String cardNumber;
    private String description;
    private String category;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id")
    private RoomEntity room;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "officer_id")
    private OfficerEntity officer;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id")
    private EmployeeEntity employee;
    private BigDecimal priceBefore;
    private BigDecimal priceNow;

    public static InventoryEntity convert(Inventory inventory) {
        return new InventoryEntity(
                inventory.getId(),
                inventory.getInventoryNumber(),
                inventory.getCardNumber(),
                inventory.getDescription(),
                inventory.getCategory(),
                RoomEntity.convert(inventory.getRoom()),
                OfficerEntity.convert(inventory.getOfficer()),
                EmployeeEntity.convert(inventory.getEmployee()),
                inventory.getPriceBefore(),
                inventory.getPriceNow()
        );
    }
}
