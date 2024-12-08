package com.soa.multimedia.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter @Setter
public class RequestMultimedia {
    private Long id;
    private String titulo;
    private String genero;
    private int anio;
    private String direccion;
    private String tipo;
    private String usuario;
    private String portada;
    private String sinopsis;
}
