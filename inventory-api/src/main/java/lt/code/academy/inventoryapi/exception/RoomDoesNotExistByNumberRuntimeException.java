package lt.code.academy.inventoryapi.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class RoomDoesNotExistByNumberRuntimeException extends RuntimeException {
    private final String roomNumber;
}