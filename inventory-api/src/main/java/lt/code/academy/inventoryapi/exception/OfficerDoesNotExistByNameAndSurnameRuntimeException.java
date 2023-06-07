package lt.code.academy.inventoryapi.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class OfficerDoesNotExistByNameAndSurnameRuntimeException extends RuntimeException{
    private final String name;
    private final String surname;
}
