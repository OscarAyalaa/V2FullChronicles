package com.soa.multimedia.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.soa.multimedia.dto.Multimedia;

@Repository
public interface MultimediaRepository extends JpaRepository<Multimedia, Long>{
    /*Page<Multimedia> findByTituloContaining(String titulo, Pageable pageable);*/
    Page<Multimedia> findByTituloContainingAndUsuario(String titulo, String usuario, Pageable pageable);
}
