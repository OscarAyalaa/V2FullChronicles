package com.soa.ExceptionHandler;

public class ApiException extends RuntimeException{
    
    public ApiException(String mensaje) {
        super(mensaje);
    }

}
