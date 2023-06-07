package lt.code.academy.inventoryapi.exception;

import lt.code.academy.inventoryapi.exception.data.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {
    @ExceptionHandler(RoomDoesNotExistByIdRuntimeException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handleRoomNotExistByIdException(RoomDoesNotExistByIdRuntimeException ex) {
        return new ExceptionResponse(String.format("Room does not exist with this id: %s", ex.getId()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RoomDoesNotExistByNumberRuntimeException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handleRoomNotExistByNumberException(RoomDoesNotExistByNumberRuntimeException ex) {
        return new ExceptionResponse(String.format("Room does not exist with this number: %s", ex.getRoomNumber()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmployeeDoesNotExistByIdRuntimeException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handleEmployeeNotExistByIdException(EmployeeDoesNotExistByIdRuntimeException ex) {
        return new ExceptionResponse(String.format("Employee does not exist with this id: %s", ex.getId()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmployeeDoesNotExistByNameAndSurnameRuntimeException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handleEmployeeNotExistByNameAndSurnameException(EmployeeDoesNotExistByNameAndSurnameRuntimeException ex) {
        return new ExceptionResponse(String.format("Employee does not exist with this name: %s and surname: %s", ex.getName(), ex.getSurname()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(OfficerDoesNotExistByIdRuntimeException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handleOfficerDoesNotExistByIdException(OfficerDoesNotExistByIdRuntimeException ex){
        return new ExceptionResponse(String.format("Officer does not exist with this id: %s", ex.getId()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(OfficerDoesNotExistByNameAndSurnameRuntimeException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handleOfficerDoesNotExistByNameAndSurnameException(OfficerDoesNotExistByNameAndSurnameRuntimeException ex){
        return new ExceptionResponse(String.format("Officer does not exist with this name: %s and surname: %s", ex.getName(), ex.getSurname()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionResponse handleException(Exception e) {
        return new ExceptionResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
