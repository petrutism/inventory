package lt.code.academy.inventoryapi.inventory.repository;

import lt.code.academy.inventoryapi.inventory.entity.InventoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InventoryRepository extends JpaRepository<InventoryEntity, UUID> {
}
