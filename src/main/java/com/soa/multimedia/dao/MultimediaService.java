package com.soa.multimedia.dao;

import java.util.Map;

import org.springframework.data.domain.Page;

import com.soa.multimedia.dto.Multimedia;


public interface MultimediaService {
    
    /*Page<Multimedia> getMultimedia(String titulo, int page, int size);*/
    Page<Multimedia> getMultimedia(String titulo, String usuario, int page, int size);
    Multimedia guardarMultimedia(Multimedia datosMultimedia);
    Multimedia obtenerMultimediaID(Long id);
    Multimedia actualizarMultimedia(Long id, Multimedia multimediaD);
    Map<String, Boolean> eliminarMultimedia(Long id);
    Multimedia randomMult();
}
