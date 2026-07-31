package com.karl.applyflow_backend.GlobalExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
public class ApplicationExceptionHandler {
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> exception1(Exception e){
        return new ResponseEntity<>("Record Doesn't Exist", HttpStatus.BAD_REQUEST);
    }
}
