package lt.code.academy.inventoryapi.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class EmployeeDoesNotExistByNameAndSurnameRuntimeException extends RuntimeException{
    private final String name;
    private final String surname;

}
