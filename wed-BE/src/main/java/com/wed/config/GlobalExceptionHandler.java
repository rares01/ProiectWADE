package com.wed.config;

import com.wed.exception.AuthenticationLoginException;
import com.wed.exception.DtoValidateAlreadyExistsException;
import com.wed.exception.DtoValidateException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {DtoValidateAlreadyExistsException.class})
    @ResponseStatus(HttpStatus.CONFLICT)
    protected ResponseEntity<Object> handleDtoValidateAlreadyExistsException(
            DtoValidateAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(value = {DtoValidateException.class})
    @ResponseStatus(HttpStatus.BAD_GATEWAY)
    protected ResponseEntity<Object> handleDtoValidateException(
            DtoValidateAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(value = {AuthenticationLoginException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    protected ResponseEntity<Object> handleAuthenticationException() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).header("x-err-code",
                "Illegal access exception").build();
    }
}
