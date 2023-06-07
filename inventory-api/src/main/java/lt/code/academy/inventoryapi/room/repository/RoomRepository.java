package lt.code.academy.inventoryapi.room.repository;

import lt.code.academy.inventoryapi.room.entity.RoomEntity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<RoomEntity, UUID> {
    Optional<RoomEntity> findRoomByRoomNumberAndCity(String number, String city);
}
