package com.wed.exception;

import jakarta.servlet.ServletException;

public class DisabledRequestsException extends ServletException {

    public DisabledRequestsException(String message) {
        super(message);
    }
}
