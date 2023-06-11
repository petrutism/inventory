package lt.code.academy.inventoryapi.inventory.controller;

import static lt.code.academy.inventoryapi.Endpoint.*;

import lt.code.academy.inventoryapi.inventory.dto.Inventory;
import lt.code.academy.inventoryapi.inventory.service.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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

    @GetMapping(value = INVENTORY_BY_ID, produces = MediaType.APPLICATION_JSON_VALUE)
    public Inventory getInventoryById(@PathVariable(INVENTORY_ID) UUID inventoryId) {
        return inventoryService.getInventoryById(inventoryId);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createInventory(@RequestBody Inventory inventoryFromForm) {
        inventoryService.createInventory(inventoryFromForm);
    }
    @PutMapping(value = INVENTORY_BY_ID, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateInventory(@RequestBody Inventory inventoryFromForm, @PathVariable(INVENTORY_ID) UUID id) {
        inventoryFromForm.setId(id);
        inventoryService.updateInventory(inventoryFromForm);
    }

    @DeleteMapping(value = INVENTORY_BY_ID)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteInventory(@PathVariable(INVENTORY_ID) UUID inventoryId){
        inventoryService.deleteInventory(inventoryId);
    }
}
