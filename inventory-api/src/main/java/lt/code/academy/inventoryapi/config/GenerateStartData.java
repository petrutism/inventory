package lt.code.academy.inventoryapi.config;

import lt.code.academy.inventoryapi.employee.dto.Employee;
import lt.code.academy.inventoryapi.employee.service.EmployeeService;
import lt.code.academy.inventoryapi.inventory.dto.Inventory;
import lt.code.academy.inventoryapi.inventory.service.InventoryService;
import lt.code.academy.inventoryapi.officer.dto.Officer;
import lt.code.academy.inventoryapi.officer.service.OfficerService;
import lt.code.academy.inventoryapi.room.dto.Room;
import lt.code.academy.inventoryapi.room.service.RoomService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class GenerateStartData implements CommandLineRunner {
    private final RoomService roomService;
    private final EmployeeService employeeService;
    private final OfficerService officerService;
    private final InventoryService inventoryService;

    public GenerateStartData(RoomService roomService, EmployeeService employeeService, OfficerService officerService, InventoryService inventoryService) {
        this.roomService = roomService;
        this.employeeService = employeeService;
        this.officerService = officerService;
        this.inventoryService = inventoryService;
    }

    @Override
    public void run(String... args) throws Exception {
        List<Room> rooms = roomService.getAllRooms();
        if (rooms.size() == 0) {
            for (int i = 100; i < 111; i++) {
                Room room = new Room();
                room.setRoomNumber(String.valueOf(i));
                room.setCity("Mažeikiai");
                roomService.createRoom(room);
            }
            for (int i = 100; i < 111; i++) {
                Room room = new Room();
                room.setRoomNumber(String.valueOf(i));
                room.setCity("Telšiai");
                roomService.createRoom(room);
            }
            for (int i = 100; i < 111; i++) {
                Room room = new Room();
                room.setRoomNumber(String.valueOf(i));
                room.setCity("Plungė");
                roomService.createRoom(room);
            }
            for (int i = 100; i < 111; i++) {
                Room room = new Room();
                room.setRoomNumber(String.valueOf(i));
                room.setCity("Skuodas");
                roomService.createRoom(room);
            }
            for (int i = 100; i < 111; i++) {
                Room room = new Room();
                room.setRoomNumber(String.valueOf(i));
                room.setCity("Naujoji Akmenė");
                roomService.createRoom(room);
            }

            Room room = new Room();
            room.setRoomNumber("106");
            room.setCity("Rietavas");
            roomService.createRoom(room);


            Employee employee1 = new Employee();
            employee1.setName("Mindaugas");
            employee1.setSurname("Petrutis");
            employee1.setRoom(roomService.getRoomByNumberAndCity("101", "Mažeikiai"));
            employeeService.createEmployee(employee1);

            Officer officer1 = new Officer();
            officer1.setName("Roma");
            officer1.setSurname("Žukienė");
            officer1.setRoom(roomService.getRoomByNumberAndCity("105", "Mažeikiai"));
            officerService.createOfficer(officer1);

            Inventory inventory1 = new Inventory();
            inventory1.setInventoryNumber("I00042536");
            inventory1.setCardNumber("40034562117821");
            inventory1.setDescription("HP DC7900");
            inventory1.setCategory("PC");
            inventory1.setRoom(roomService.getRoomByNumberAndCity("100", "Mažeikiai"));
            inventory1.setOfficer(officerService.findOfficerByNameAndSurname("Roma", "Žukienė"));
            inventory1.setEmployee(employeeService.findEmployeeByNameAndSurname("Mindaugas", "Petrutis"));
            inventory1.setPriceBefore(BigDecimal.valueOf(1000.00));
            inventory1.setPriceNow(BigDecimal.valueOf(800.00));
            inventoryService.saveInventory(inventory1);
        }

    }
}
