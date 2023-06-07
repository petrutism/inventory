package lt.code.academy.inventoryapi.room.service;

import lt.code.academy.inventoryapi.room.dto.Room;
import lt.code.academy.inventoryapi.room.entity.RoomEntity;
import lt.code.academy.inventoryapi.exception.RoomDoesNotExistByIdRuntimeException;
import lt.code.academy.inventoryapi.exception.RoomDoesNotExistByNumberRuntimeException;
import lt.code.academy.inventoryapi.room.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService (RoomRepository roomRepository){
        this.roomRepository = roomRepository;
    }

    public List<Room> getAllRooms(){
        return roomRepository.findAll()
                .stream()
                .map(Room::convert)
                .toList();
    }
    public Room getRoomById(UUID id){
        return roomRepository.findById(id)
                .map(Room::convert)
                .orElseThrow(()-> new RoomDoesNotExistByIdRuntimeException(id));
    }

    public Room getRoomByNumberAndCity(String number, String city){
        return roomRepository.findRoomByRoomNumberAndCity(number, city)
                .map(Room::convert)
                .orElseThrow(()-> new RoomDoesNotExistByNumberRuntimeException(number));
    }

    public void createRoom(Room room){
        roomRepository.save(RoomEntity.convert(room));
    }
    public void updateRoom(Room room){
        getRoomById(room.getId());
        roomRepository.save(RoomEntity.convert(room));
    }
    public void deleteRoom(UUID id){
        roomRepository.deleteById(id);
    }
}
