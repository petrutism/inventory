package lt.code.academy.inventoryapi.inventory.service;

import lt.code.academy.inventoryapi.inventory.dto.Inventory;
import lt.code.academy.inventoryapi.inventory.entity.InventoryEntity;
import lt.code.academy.inventoryapi.inventory.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public void saveInventory(Inventory inventory) {
        inventoryRepository.save(InventoryEntity.convert(inventory));
    }

    public List<Inventory> getAllInventory(){
        return inventoryRepository.findAll()
                .stream()
                .map(Inventory::convert)
                .toList();
    }
}
