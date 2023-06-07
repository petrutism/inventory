package lt.code.academy.inventoryapi.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Getter
@RequiredArgsConstructor
public class OfficerDoesNotExistByIdRuntimeException extends RuntimeException{
    private final UUID id;
}
