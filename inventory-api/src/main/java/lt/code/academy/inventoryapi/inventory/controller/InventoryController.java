package lt.code.academy.inventoryapi.inventory.controller;

import static lt.code.academy.inventoryapi.Endpoint.*;

import lt.code.academy.inventoryapi.inventory.dto.Inventory;
import lt.code.academy.inventoryapi.inventory.service.InventoryService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(INVENTORIES)
public class InventoryController {
    InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Inventory> getAllInventory(){
        return inventoryService.getAllInventory();
    }
}
