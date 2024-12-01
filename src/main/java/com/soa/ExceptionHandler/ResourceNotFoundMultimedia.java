package com.soa.ExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundMultimedia extends RuntimeException{
    
    private static final long serialVersionUID = 1L;
    
    public ResourceNotFoundMultimedia(String mensaje) {
        super(mensaje);
    }
}
