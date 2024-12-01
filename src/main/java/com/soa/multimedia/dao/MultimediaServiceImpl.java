package com.soa.multimedia.dao;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import com.soa.ExceptionHandler.ApiException;
import com.soa.ExceptionHandler.ResourceNotFoundMultimedia;
import com.soa.multimedia.dto.Multimedia;
import com.soa.multimedia.repository.MultimediaRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static com.soa.query.MultimediaQuery.*;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MultimediaServiceImpl implements MultimediaService{
    
    private final MultimediaRepository multimediaRepository;
    private final NamedParameterJdbcTemplate jdbc;

    @Override
    public Page<Multimedia> getMultimedia(String titulo, int page, int size) {
        log.info("Fetching users for page {} of size {}", page, size);
        return multimediaRepository.findByTituloContaining(titulo, PageRequest.of(page, size));
    }

    @Override
    public Multimedia guardarMultimedia(Multimedia datosMultimedia) {
        if(getRegisterCount(datosMultimedia) > 0) throw new ApiException("Ya existe un registro con los mismos datos");
        return multimediaRepository.save(datosMultimedia);
    }

    
    @Override
    public Multimedia obtenerMultimediaID(Long id) {
        Multimedia multimedia = multimediaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundMultimedia("No se encontro multimedia con el ID: "+id));
        return multimedia;
    }

    @Override
    public Multimedia actualizarMultimedia(Long id, Multimedia multimediaD) {
        Multimedia multimedia = multimediaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundMultimedia("No se encontro multimedia con el ID: "+id));
        
        multimedia.setTitulo(multimediaD.getTitulo());
        multimedia.setGenero(multimediaD.getGenero());
        multimedia.setAnio(multimediaD.getAnio());
        multimedia.setDireccion(multimediaD.getDireccion());
        multimedia.setTipo(multimediaD.getTipo());
        multimedia.setPortada(multimediaD.getPortada());
        multimedia.setSinopsis(multimediaD.getSinopsis());
        
        Multimedia multimediaActualizada = multimediaRepository.save(multimedia);
        
        return multimediaActualizada;
    }

    @Override
    public Map<String, Boolean> eliminarMultimedia(Long id) {
        Multimedia multimedia = multimediaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundMultimedia("No se encontro multimedia con el ID: "+id));
        
        multimediaRepository.delete(multimedia);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("Eliminado", Boolean.TRUE);
        
        return respuesta;
    }
    
    
    private int getRegisterCount(Multimedia datosMultimedia) {
        return jdbc.queryForObject(COUNT_MULTIMEDIA_REGISTER_QUERY, Map.of("titulo", datosMultimedia.getTitulo()+"%", "anio", datosMultimedia.getAnio(), "director", datosMultimedia.getDireccion()), Integer.class);
    }


}
