package lt.code.academy.inventoryapi.room.controller;

import static lt.code.academy.inventoryapi.Endpoint.*;

import lt.code.academy.inventoryapi.room.dto.Room;
import lt.code.academy.inventoryapi.room.service.RoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(ROOMS)
public class RoomController {
    RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Room> getRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping(value =CITIES ,produces = MediaType.APPLICATION_JSON_VALUE)
    public List<String> getCities() {
        List<Room> rooms = getRooms();
        List<String> cities = new ArrayList<>();

        for (Room room : rooms) {
            if(!cities.contains(room.getCity())){
                cities.add(room.getCity());
            }
        }

        return cities;
    }
    @GetMapping(value =ROOM_NUMBERS ,produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Room> getRoomsByCity(@PathVariable(CITY) String city){
        List<Room> rooms = getRooms();
        List<Room> roomsByCity = new ArrayList<>();

        for (Room room : rooms) {
            if(room.getCity().equals(city) ){
                roomsByCity.add(room);
            }
        }
        return roomsByCity;
    }

    @GetMapping(value = ROOM_BY_ID, produces = MediaType.APPLICATION_JSON_VALUE)
    public Room getRoomById(@PathVariable(ROOM_ID) UUID id) {
        return roomService.getRoomById(id);
    }

    @GetMapping(value = ROOM_BY_NUMBER_AND_CITY, produces = MediaType.APPLICATION_JSON_VALUE)
    public Room getRoomByNumberAndCity(@PathVariable(ROOM_NUMBER) String number, @PathVariable(CITY) String city) {
        return roomService.getRoomByNumberAndCity(number, city);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createRoom(@RequestBody Room room) {
        roomService.createRoom(room);
    }

    @PutMapping(value = ROOM_BY_ID, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateRoom(@RequestBody Room room, @PathVariable(ROOM_ID) UUID id) {
        room.setId(id);
        roomService.updateRoom(room);
    }

    @DeleteMapping(value = ROOM_BY_ID)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRoom(@PathVariable(ROOM_ID) UUID id) {
        roomService.deleteRoom(id);
    }
}
