package com.soa.multimedia.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter @Setter
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class Multimedia {
    
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String genero;
    private int anio;
    private String direccion;
    private String tipo;
    private String usuario;
    private String portada;
    @Column(length = 1000000)
    private String sinopsis;
}
